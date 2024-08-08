const express = require('express')
const router = express.Router()
const controller = require('../controllers/mainController')

router.get('/', controller.getIndex)

module.exports = router