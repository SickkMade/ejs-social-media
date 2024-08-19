const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController.js')
const multer = require('../middleware/multer')

//"file" is name of the form body element
router.post('/createPost', multer.single("image"), postController.createPost)
router.get('/:id', postController.getPost)
router.put('/like/:id', postController.likePost)
router.delete('/deletePost/:id', postController.deletePost)

module.exports = router