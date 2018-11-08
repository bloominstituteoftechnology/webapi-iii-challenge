const express = require('express');
const userRouter = require('../users/userRouter.js');
const configureMiddleware = require('../config/middleware.js');
const server = express();


configureMiddleware(server);

server.use('/', userRouter);

module.exports = server;

