const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

server.use(logger('dev'), detailedLogger, express.json(), helmet());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Hello Universe!</h1><h2>Let's write some middleware!</h2>`);
});

//custom middleware

function detailedLogger(req, res, next) {
  console.log(`Type:${req.method}, Url:${req.url}, Requested on:${Date()}`);
  next();
}

module.exports = server;
