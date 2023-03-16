const {Comment, Book} = require('../model/model')
var path = require('path');
// const multer = require('multer');
//
// const router = require('express').Router();
//
// const multerStorage = multer.memoryStorage();
// const upload = multer({ storage: multerStorage, });


const commentController = {
    addComment: async (req,res) =>{
        try{
            const newComment = new Comment({date:Date.now(),...req.body})
            const saveComment = await newComment.save()
            if(req.body.idBook){
                const book = Book.findById(req.body.idBook)
                await book.updateOne({$push: {comments: saveComment._id}})
            }
            res.status(200).json(saveComment)
        }catch (e) {
            res.status(500).json(e)
        }
    },
    //GET ALL USERs
    getComment: async (req,res) =>{
        try {
            //console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
            const comment = await Comment.findById({_id:req.params.id}).populate("idUser")
            res.status(200).json(comment)
        } catch (e) {
            res.status(500).json(e)
        }
    },
    updateComment: async (req,res) => {
        try{
            const comment = await  Comment.findById({_id: req.params.id})
            await comment.updateOne({$set: req.body})
            res.status(200).json("updated")

        }catch (e) {
            res.status(500).json(e)
        }
    },
    deleteComment: async (req,res) => {
        try{
            await Comment.updateMany(
                {$pull: {comments:req.params.id}}
            )
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted")
        }catch (e) {
            res.status(500).json(e)
        }
    },
}

module.exports = commentController