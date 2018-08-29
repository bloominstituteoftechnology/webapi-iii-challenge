'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const userMiddleware = require('../middlewars/users')

router.get('/', userController.getUsers)
router.post('/', userMiddleware.nameCheck, (req, res) => {
    res.send(req.body)
})

module.exports = router
