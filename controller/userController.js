const {User} = require('../model/model')

// const multer = require('multer');
//
// const router = require('express').Router();
//
// const multerStorage = multer.memoryStorage();
// const upload = multer({ storage: multerStorage, });


const userController = {
    addUser: async (req,res) =>{
        try{
            const newUser = new User(req.body)
            //console.log(req.body)
            const saveUser = await newUser.save()

            res.status(200).json(saveUser)
        }catch (e) {
            res.status(500).json(e)
        }
    },
    //GET ALL USERs
    getAllUser: async (req,res) =>{
        try {
            //console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
            const allUsers = await User.find()
            res.status(200).json(allUsers)
        } catch (e) {
            res.status(500).json(e)
        }
    },
    //GET A USER
    getAUser: async (req,res) =>{
        try{
            const user = await  User.findOne({username: req.params.username})
            res.status(200).json(user)
        }catch (e) {
            res.status(500).json(e.message)
        }
    },
    //UPDATE A USER
    updateUser: async (req,res) => {
        try{
            const user = await  User.findById({_id: req.params.id})
            await user.updateOne({$set: req.body})
            res.status(200).json("updated")

        }catch (e) {
            res.status(500).json(e)
        }
    },

    getUserFavorite: async (req,res) =>{
        try{
            const user = await  User.findOne({username: req.params.username}).populate("favorite").select("favorite")
            res.status(200).json(user)
        }catch (e) {
            res.status(500).json(e.message)
        }
    },
    // deleteUser: async (req,res) => {
    //     try{
    //         await Author.updateMany(
    //             {$pull: {books:req.params.id}}
    //         )
    //         await Book.findByIdAndDelete(req.params.id)
    //         res.status(200).json("deleted")
    //     }catch (e) {
    //         res.status(500).json(e)
    //     }
    // },
}

module.exports = userController