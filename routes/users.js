'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const userMiddleware = require('../middlewars/users')

router.get('/', userController.getUsers)
router.post('/', userMiddleware.nameCheck, userController.insertUser)
router.put('/:id', userMiddleware.idCheck, userController.updateUser )
router.delete('/:id', userMiddleware.idCheck, userController.deleteUser)
router.get('/posts/:id', userMiddleware.idCheck, userController.getUserPosts)
module.exports = router