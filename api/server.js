const express = require('express')
const server = express();
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const usersRouter = require('../routers/usersRouter.js')
const postsRouter = require('../routers/postsRouter.js')

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use('/users', usersRouter);
server.use('/posts', postsRouter);


module.exports = server
