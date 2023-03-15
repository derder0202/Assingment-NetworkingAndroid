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
    description:{
        type: String,
        required : true
    },
    author:{
        type: String,
        required : true
    },
    year:{
      type:Number,
      require: true
    },
    mainImg:{
        type: String,
        required : true
    },
    imgs: [String],
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    fullName:{
        type:String,
        required: true
    }
})

const commentSchema = new mongoose.Schema({
    idBook:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    idUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    }
})

let Comment = mongoose.model("Comment",commentSchema)
let User = mongoose.model("User",userSchema)
let Book = mongoose.model("Book",bookSchema)
let Author = mongoose.model("Author",authorSchema)

module.exports = {Book, Author,User,Comment}

