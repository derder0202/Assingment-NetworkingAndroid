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
const bookV2Router = require("./routes/bookv2testRealm")

//CONNECT DATABASE MONGO
dotenv.config()
mongoose.connect(process.env.MONGODB_URL,()=>{
        console.log("Connected to MongoDb")
})

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())
app.use(morgan('common'))

app.get("/",async (req,res) =>{
    res.status(200).json("Hello")
})

//ROUTES
app.use('/v1/author',authorRoute)
app.use('/v1/book',bookRoute)
app.use('/v2/book',bookV2Router)

app.use('/v1/user',userRoute)
app.use('/v1/comment',commentRoute)


app.listen(8000,()=>{
    console.log("Server is running...")
})

module.exports = {app}
