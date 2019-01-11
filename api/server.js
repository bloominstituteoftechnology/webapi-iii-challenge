const express = require('express');
const usersdb = require('../data/helpers/userDb.js');
const server = express();

const configureMiddleware = require('../config/middleware.js');
configureMiddleware(server);

server.get('/', (req, res) => {
  res.send(`Server is running...`);
});

 const usersRouter = require('../users/usersRouter.js');
const postsRouter = require('../posts/postsRouter.js');

 server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

module.exports = server;