const express = require('express');
const logger = require('morgan');
const usersRouter = require('./data/controllers/users.js');
const postsRouter = require('./data/controllers/posts.js');

const server = express();
const parser = express.json();
const logMiddleware = logger('dev');



server.use(parser, logMiddleware);

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Node Blog</h2>
    <p>Welcome to David's Node Blog</p>
    `);
});

module.exports = server;
