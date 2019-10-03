const express = require('express');

const server = express();

const logger = require('./middleware/logging/logger.js');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;