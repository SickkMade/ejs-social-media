const express = require('express')
const router = express.Router()
const controller = require('../controllers/mainController')

router.get('/', controller.getIndex)
router.get('/login', controller.getLogin)
router.get('/signup', controller.getSignup)

module.exports = router