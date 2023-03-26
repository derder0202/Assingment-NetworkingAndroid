const route = require('express').Router()
const bookController = require('../controller/bookController')
const authorController = require("../controller/authorController");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const path = require("path");
const {Book} = require("../model/model");

const checkFileType = function (file, cb) {
//Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

//check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};
const upload2 = multer({ storage: storage,
    fileFilter: (req,file, cb) =>{
        checkFileType(file,cb)
    }
}).array("imgs",1000)

const fs = require('fs-extra')


//ADD BOOK
//route.post('/',upload.single('image'),bookController.addBook)
//GET ALL BOOKS
route.get('/',bookController.getAllBook)
//GET A BOOK
route.get("/:id",bookController.getABook)
//GET  BOOK comment
route.get("/:id/comment",bookController.getBookComment)
//UPDATE A BOOK
route.put('/:id',bookController.updateBook)
//Delete A BOOK
route.delete('/:id',bookController.deleteBook)

//test
route.post('/',async (req,res)=>{
    try {
        upload2(req, res, async function  (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
            } else if (err) {
                // An unknown error occurred when uploading.
            }
            //url = `${req.protocol + '://' + '192.168.1.76:3000'}/v1/book/7vienngocrong/${req.file.filename}`

            const newBook = new Book()
            let imgs = []
            for(var i=1; i<req.files.length; i++){
                imgs.push(`${req.protocol}://${req.get('host')}${req.originalUrl}/${newBook.id}/${req.files[i].originalname}`)
                fs.move(`./uploads/${req.files[i].originalname}`,`./uploads/${newBook.id}/${req.files[i].originalname}`)
            }
            newBook.set({mainImg:`${req.protocol}://${req.get('host')}${req.originalUrl}/${newBook.id}/${req.files[0].originalname}`,imgs,...req.body})
            fs.move(`./uploads/${req.files[0].originalname}`,`./uploads/${newBook.id}/${req.files[0].originalname}`)

            await newBook.save()

            res.status(200).json("OK")
            //res.send(req.file.filename);
            // Everything went fine.
        })
    } catch (e) {
        res.status(400).send("Please upload a valid image");
    }
})

//getimage
route.get('/:book/:id',bookController.getImage)

route.post('/replace',bookController.replaceIP)


//save objectId book to user
// input => idUser, idBook
route.post("/addToFavorite",bookController.addToFavorite)
route.post("/likeBook",bookController.likeBook)


module.exports = route