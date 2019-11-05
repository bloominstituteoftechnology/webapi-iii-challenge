const express = require('express');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

const middleware = [
  logger
];

server.use(express.json());

server.use(middleware);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


//custom middleware

function logger(req, res, next) {
  console.log({
    request_method: req.method,
    request_url: req.url,
    timestamp: Date().toString()
  });
  next();
};

module.exports = server;
