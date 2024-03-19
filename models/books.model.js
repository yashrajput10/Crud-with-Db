const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    bookName:String,
    author:String,
    email:String,
    contact:Number,
    city:String,
    zip:Number

});

const bookModel = mongoose.model('bookscollection',bookSchema);

module.exports = bookModel;