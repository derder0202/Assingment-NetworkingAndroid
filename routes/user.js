const router = require('express').Router()
const userController = require('../controller/userController')

//Add user
router.post("/",userController.addUser)

//Get all user
router.get('/',userController.getAllUser)

//Get a user
router.get("/:username",userController.getAUser)

//Update a user
router.put('/:id',userController.updateUser)




module.exports = router
