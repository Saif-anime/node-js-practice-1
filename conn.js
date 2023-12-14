const mongoose = require('mongoose');

const conn = async() => {
    await mongoose.connect('mongodb://127.0.0.1:27017/data');
    console.log('connection succ')
}

conn();
module.exports = conn;



