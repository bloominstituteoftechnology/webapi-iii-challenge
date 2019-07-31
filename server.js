const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

server.use(logger('dev'));
server.use(typeLogger);
server.use(express.json());
server.use(helmet());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function typeLogger(req, res, next) {
  console.log(`${req.method} Request, ${req.url} Request, ${Date()}`);
  next();
}

module.exports = server;
