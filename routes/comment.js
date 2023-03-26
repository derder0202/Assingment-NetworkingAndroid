const router = require('express').Router()
const commentController = require('../controller/commentController')

//Add comment
router.post("/",commentController.addComment)

router.get("/",commentController.getAllComment)
router.get("/book/:idBook",commentController.getListCommentByBook)

//Get comment
router.get("/:id",commentController.getComment)

//Update comment
router.put('/:id',commentController.updateComment)

//Delete comment

router.delete("/:id",commentController.deleteComment)




module.exports = router
