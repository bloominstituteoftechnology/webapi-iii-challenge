'use strict'

const express = require('express')
const router = express.Router()
const postControllers = require('../controllers/post_controller')
const postMiddleware = require('../middlewars/posts')

router.get('/', postControllers.getPosts)
router.post('/', postMiddleware.inputCheck ,postControllers.insertPost)
router.put('/:id',postMiddleware.idCheck, postMiddleware.inputCheck, postControllers.updatePost)
router.delete('/:id', postMiddleware.idCheck, postControllers.deletePost)

module.exports = router