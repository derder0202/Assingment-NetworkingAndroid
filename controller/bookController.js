const {Book,Author,ImageModel, User} = require('../model/model')
var path = require('path');
// const multer = require('multer');
//
// const router = require('express').Router();
//
// const multerStorage = multer.memoryStorage();
// const upload = multer({ storage: multerStorage, });


const bookController = {
    addBook: async (req,res) =>{
        try{
            const newBook = new Book(req.body)
            const saveBook = await newBook.save()

            if(req.file){
                const image = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype }
                const savedImage = await ImageModel.create(image);
                await saveBook.updateOne({$set: {img:savedImage._id}})
            }
            if(req.body.author){
                const author = Author.findById(req.body.author)
                await author.updateOne({ $push: {books: saveBook._id} })
            }
            res.status(200).json(saveBook)
        }catch (e) {
            res.status(500).json(e)
        }
    },
    //GET ALL BOOKS
    getAllBook: async (req,res) =>{
        try {
                // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
            const allBooks = await Book.find()
            //console.log(allBooks["comments"])
            res.status(200).json(allBooks)
        } catch (e) {
            res.status(500).json(e)
        }
    },

    //GET A BOOK
    getABook: async (req,res) =>{
        try{
            const book = await  Book.findById({_id: req.params.id}).populate("comments").populate({path: "comments", populate:{path:"idUser", select: "fullName",}, select:"_id idUser content date"})
            res.status(200).json(book)
        }catch (e) {
            res.status(500).json(e.message)
        }
    },

    getBookComment:async (req,res) =>{
        try {
            // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
            const allBooks = await Book.findById({_id: req.params.id}).populate({path: "comments", populate:{path:"idUser", select: "fullName",}, select:"_id idUser content date"})
            res.status(200).json(allBooks.comments)
        } catch (e) {
            res.status(500).json(e)
        }
    },

    //UPDATE A BOOK
    updateBook: async (req,res) => {
        try{
            const book = await  Book.findById({_id: req.params.id})
            await book.updateOne({$set: req.body})
            res.status(200).json("updatedx")

        }catch (e) {
            res.status(500).json(e)
        }
    },
    deleteBook: async (req,res) => {
        try{
            // await Author.updateMany(
            //     {$pull: {books:req.params.id}}
            // )
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted")
        }catch (e) {
            res.status(500).json(e)
        }
    },
    getImage: async (req,res) =>{
        try{
            console.log(req.params.book)
            res.sendFile(path.resolve(`uploads/${req.params.book}/${req.params.id}`));
        }catch (e){
            res.status(500).json(e)
        }
    },
    replaceIP: async (req,res) =>{
        try{
            const books = await Book.find()
            //console.log(books.length)
            for (let i =0; i<books.length; i++){
                //console.log(books[i].mainImg.replace("localhost:8000/",req.body.ip+'/'))
                let imgs = []
                books[i].imgs.forEach(img => imgs.push(img.replace("localhost","10.24.23.13")))
                await books[i].updateOne({mainImg: books[i].mainImg.replace("localhost",req.body.ip),imgs})

            }
            res.status(200).json("OK")
        }catch (e){
            res.status(500).json(e)
        }
    },
    addToFavorite: async (req,res) =>{
        try{
            const user = await User.findById(req.body.idUser)
             await user.updateOne({$push:{favorite: req.body.idBook}})
             res.status(200).json(user)
        }catch (e){
            res.status(500).json(e)
        }
    },
    likeBook: async (req,res) =>{
        try{
            const book = await Book.findById(req.body.idBook)
            await book.updateOne({$push:{like: req.body.idUser}})
            res.status(200).json(book)
        }catch (e){
            res.status(500).json(e)
        }
    },
    unLikeBook: async (req,res) =>{
        try{
            const book = await Book.findById(req.body.idBook)
            await book.updateOne({$pull:{like: req.body.idUser}})
            res.status(200).json(book)
        }catch (e){
            res.status(500).json(e)
        }
    },
}

module.exports = bookController