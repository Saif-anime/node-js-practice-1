const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    }
})

const Data = mongoose.model('Data', DataSchema);


module.exports = Data;