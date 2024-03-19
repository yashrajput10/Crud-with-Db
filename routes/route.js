const express = require("express");
const routes = express();
const bookModel = require('../models/books.model.js');

routes.get('/',(req,res)=>{

    res.render('index');

});

routes.get('/viewBook',async (req,res)=>{

        let books = await bookModel.find({});
        console.log('Books');

    res.render('view',{books});
})



routes.post('/addBook',async (req,res)=>{

    let {editId} = req.body;
    
    if(!editId){
        let book = new bookModel({
    
            bookName:req.body.bookname,
            author:req.body.author,
            email:req.body.email,
            contact:req.body.contact,
            city:req.body.city,
            zip:req.body.zip
            
        });
        await book.save();
        console.log('Form Sumit');
        res.redirect('/viewBook');
    }else{

        let updateBook =await bookModel.updateOne({_id : editId},{
            bookName: req.body.bookname,
            author:req.body.author,
            email:req.body.email,
            contact:req.body.contact,
            city:req.body.city,
            zip:req.body.zip
        });
        console.log("updateBook ...");
        res.redirect('/viewBook');
    }

});

routes.get('/deleteBook/:id',async (req,res)=>{
    let {id} = req.params;

    await bookModel.deleteOne({_id : id});

    console.log("Record delted");

    res.redirect('/viewBook');

});

routes.get('/editBook/:id',async(req,res)=>{
    let  {id} = req.params;

    let singleBook = await bookModel.findById({_id : id}); 

    console.log(singleBook);

    res.render('edit',{singleBook});
})


module.exports=routes;