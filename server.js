const express = require('express');
const server = express();
const middleware = [
  express.json(),
  logger,
  validateUserId,
  validateUser,
  validatePost
];
server.use(middleware);



module.exports = server;