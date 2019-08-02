const express = require('express');

const server = express();

const userRouter = require('./users/userRouter');

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method}, ${req.url},
  ${new Date().toISOString()}`);
  next();
};

module.exports = server;
