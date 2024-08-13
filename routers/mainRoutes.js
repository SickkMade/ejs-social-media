const express = require('express')
const router = express.Router()
const controller = require('../controllers/mainController')

router.get('/', controller.getIndex)
router.get('/login', controller.getLogin)
router.get('/signup', controller.getSignup)
router.post('/login', controller.postLogin)
router.post('/signup', controller.postSignup)

module.exports = router