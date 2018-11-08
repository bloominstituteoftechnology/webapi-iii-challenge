const express = require('express');
const userRouter = require('../users/userRouter.js');
const postRouter = require('../posts/postRouter.js');


const configureMiddleware = require('../config/middleware.js');
const server = express();


configureMiddleware(server);

server.use('/', userRouter);
server.use('/post', postRouter);

module.exports = server;

