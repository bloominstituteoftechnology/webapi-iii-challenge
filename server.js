const express = require('express');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send({messageOfTheDay:process.env.MDOT})
});

//custom middleware


function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} ${req.url} ${time}`)
  next();
};



module.exports = server;
