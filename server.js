const express = require('express');
const helmet = require('helmet');

const postsRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();
server.use(express.json());

function logger(req, res, next) {
  const seconds = new Date().toISOString();
    type= req.headers.type;
    url = req.headers.url;
  console.log(url, type, seconds);
    next();
  };

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('/api/posts',  postsRouter);

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Writing Middleware!</h2>`)
});

module.exports = server;