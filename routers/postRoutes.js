const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const multer = require('../middleware/multer')

//"file" is name of the form body element
router.post('/createPost', multer.single("image"), postController.createPost)

module.exports = router