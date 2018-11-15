const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postRouter = require('../posts/postRouter.js');
const usersRouter = require('../users/usersRouter.js');

module.exports = server => {

  server.use(express.json());
  server.use(helmet());
  server.use(morgan('dev'));

  //POSTS and USERS endpoints (route handlers)
  server.use('/api/posts', postRouter);
  server.use('/api/users', usersRouter);
}