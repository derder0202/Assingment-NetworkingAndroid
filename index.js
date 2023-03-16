const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const morgan = require("morgan")
const dotenv = require("dotenv")
const authorRoute = require('./routes/author')
const bookRoute = require('./routes/book')
const userRoute = require('./routes/user')
const commentRoute = require('./routes/comment')

//CONNECT DATABASE MONGO
dotenv.config()
mongoose.connect("mongodb+srv://mr73367:Dontdie1@cluster0.e3xjorq.mongodb.net/?retryWrites=true&w=majority",()=>{
        console.log("Connected to MongoDb")
})

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())
app.use(morgan('common'))

//ROUTES
app.use('/v1/author',authorRoute)
app.use('/v1/book',bookRoute)
app.use('/v1/user',userRoute)
app.use('/v1/comment',commentRoute)


app.listen(8000,()=>{
    console.log("Server is running...")
})
