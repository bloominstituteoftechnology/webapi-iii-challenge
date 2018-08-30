const express = require('express');

const server = express();

const userDb = require('./data/helpers/userDb.js');

const postDb = require('./data/helpers/postDb.js');

const userRouter = require('./users/routes');

const postRouter = require('./posts/routes');


server.use(express.json());

server.use('/users', userRouter);

server.use('/posts', postRouter);

server.listen(8000, ()=>console.log('Hello!'))

function errorHandler(err, req, res, next) {
  switch(err.errorCode) {
    case 1404:
      res.status(404).json(err.errorMessage)
    case 1500:
      res.status(500).json(err.errorMessage)

  }
}
