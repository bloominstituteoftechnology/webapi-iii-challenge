require('dotenv').config();
const express = require('express');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

const messageOfTheDay = process.env.MOTD;

const middleware = [
  logger
];

server.use(express.json());

server.use(middleware);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>${messageOfTheDay}</h2>`);
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
