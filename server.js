const express = require('express');
const server = express();
const logger = require('morgan');
const userRouter = require('./users/userRouter.js')

server.use(express.json());
server.use(logger('combined'));
server.use('/api/users', userRouter);

//custom middleware

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports  = server;
