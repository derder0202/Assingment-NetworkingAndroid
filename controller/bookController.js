const {Book,Author,ImageModel} = require('../model/model')
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
            console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
            const allBooks = await Book.find()
            res.status(200).json(allBooks)
        } catch (e) {
            res.status(500).json(e)
        }
    },
    //GET A BOOK
    getABook: async (req,res) =>{
        try{
            const book = await  Book.findById({_id: req.params.id}).populate("author").populate('img')
            res.status(200).json(book)
        }catch (e) {
            res.status(500).json(e.message)
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
            await Author.updateMany(
                {$pull: {books:req.params.id}}
            )
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
    }
}

module.exports = bookController