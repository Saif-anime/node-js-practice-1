const app = require('express');
const express = app();
const path = require('path');
const port = 8000;
const hb = require('hbs')
const multer = require('multer');
const file_upload = path.join(__dirname, "./public/upload")

const connection = require('./conn');



// public access here 

express.use(app.static(path.join(__dirname, './public')))
express.use(app.json());
express.use(app.urlencoded({ extended: true }));
// const upload =  multer({ dest: file_upload })


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, file_upload)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '.jpg'
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


//   this is schema here 
const data = require(path.join(__dirname, './Model/data.js'));
const template = path.join(__dirname, '/template')


express.set('view engine', 'hbs')
express.set('views', template)

// read data user 

express.get('/', async (req, res) => {

  const datauser = await data.find();
  console.log(datauser)
  res.render('index', { "data": datauser });
})



// create user 


express.post('/', upload.single('file'), async (req, res) => {
  const d = await data({
    fname: req.body.fname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    file: req.file.filename
  });


  await d.save();

  // console.log(req.file)

  res.redirect('/');
})


// delete user 

express.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await data.deleteOne({ _id: id });
  res.status(201).json(id);

})


express.get('/update/:id', async (req, res) => {
  const id = req.params.id;
  const userdata = await data.find({ _id: id });
  // console.log(userdata)
  res.render('update', { 'data': userdata });
})


// update user ss
express.put('/update/:id', upload.single('file'), async (req, res) => {
  const id = req.params.id;

  // console.log(req.file)
  const update = await data.updateOne({ _id: id }, {
    $set: {
      fname: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.pass,
      file: req.file.filename
    }
  });

  res.status(201).json(id);

})






express.listen(port, () => {
  console.log('port running server', port)
})

