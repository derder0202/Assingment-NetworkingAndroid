const { realm} = require("../model/realmModel");
const route = require('express').Router()

route.post('/',async (req,res)=>{
    let addUser
    realm.write(()=>{
        addUser = realm.create("User",req.body)
    })
   // const addUser = req.body
    res.status(200).json(addUser)
})

route.get('/', async (req,res)=>{
    const users = realm.objects("User")
    console.log(realm.path)
    res.status(200).json(users)
})

route.get('/:id', async (req,res)=>{
    const user = await realm.objects("User")
    const userx = user.filtered(`username == '${req.params.id}'`)

    res.status(200).json(userx)
})

module.exports = route