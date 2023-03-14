const {Book,Author} = require('../model/model')

const authorController = {
    // Add author
    addAuthor: async (req,res) =>{
        try{
            const newAuthor = new Author(req.body)
            const savedAuthor  = await newAuthor.save()
            res.status(200).json(savedAuthor)
        }catch (e) {
            res.status(500).json(e)
        }
    },
    // Get all authors
    getAllAuthors: async (req,res) =>{
        try{
            const authors = await Author.find()
            res.status(200).json(authors)
        }catch (e) {
            res.status(500).json(e)
        }
    },
    getAnAuthor: async (req,res) => {
        try{
            const author = await Author.findById({_id: req.params.id}).populate("books")
            res.status(200).json(author)
        }catch (e) {
            res.status(500).json(e)
        }
    },
    updateAnAuthor: async (req,res) => {
        try{
            const author = await Author.findById({_id: req.params.id})
            await author.updateOne({$set: req.body})
            res.status(200).json("updated")
        } catch (e) {
            res.status(500).json(e)
        }
    },
    deleteAuthor: async (req,res) => {
        try{
            await Book.updateMany({author: req.params.id},{$unset: {author:req.params.id}})
            await Author.findByIdAndDelete(req.params.id)
        }catch (e) {

        }
    }
}

module.exports = authorController