const express = require('express');
const server = express();
const postRouter = require('../posts/postRouter')
const userRouter = require('../users/userRouter')

server.use(express.json())
server.use('/api/users/',userRouter)
server.use('/api/posts/',postRouter)





module.exports = server;