const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    books:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Book"
        }
    ]
})

const bookSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    price:{
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    imgs: [String]
})
const imgSchema = mongoose.Schema({
    data: Buffer,
    contentType: String
})

let Book = mongoose.model("Book",bookSchema)
let Author = mongoose.model("Author",authorSchema)
const ImageModel = mongoose.model('Image', imgSchema);

module.exports = {Book, Author,ImageModel}

