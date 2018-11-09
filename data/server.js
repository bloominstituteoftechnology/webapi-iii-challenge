const express = require('express');
const userRouter = require('./api/userRouter');
const postRouter = require('./api/postRouter');
const server = express();

server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

module.exports = server;