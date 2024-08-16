const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')
const authController = require('../controllers/Auth')
const authMiddleware = require('../middleware/auth.js')

router.get('/', mainController.getIndex)
router.get('/login', authMiddleware.isLoggedIn, authController.getLogin)
router.get('/signup', authMiddleware.isLoggedIn, authController.getSignup)
router.post('/login', authController.postLogin)
router.post('/signup', authController.postSignup)
router.get('/profile', authMiddleware.isUserAuthenticated, mainController.getProfile)

module.exports = router