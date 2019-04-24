const express = require('express');

const server = express();

server.use(express.json());

const postRouter = require('./data/routers/postRoutes');
const userRouter = require('./data/routers/userRoutes')

server.use('./api/posts', postRouter);
server.use('/api/users', userRouter);

module.exports = server;