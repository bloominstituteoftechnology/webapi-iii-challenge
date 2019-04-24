// code away!
const express = require('express');
const helmet = require('helmet');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const server = express();

function upperCaseName(req, res, next) {
    if (req.body.name) {
      req.body.name = req.body.name.toUpperCase();
    }
    next();
  }

server.use(helmet());
server.use(express.json());
server.use(upperCaseName);
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

module.exports = server;