const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

server.use(logger('dev'), typeLogger, express.json(), helmet());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function typeLogger(req, res, next) {
  console.log(`Type:${req.method}, Url:${req.url}, Requested on:${Date()}`);
  next();
}

module.exports = server;
