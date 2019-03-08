const express = require('express'); // importing a CommonJS module
const logger = require('morgan');
const helmet = require('helmet');

const userRouter = require('./data/routers/user-router.js')
const postRouter = require('./data/routers/post-router.js')

const server = express();
const parser = express.json();
const logMiddleware = logger('dev'); //or teny
const securityMiddleware = helmet();

server.use(parser, logMiddleware, securityMiddleware);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', async (req, res) => {
  res.send(`
    <h2>TEST</h2>`);
});

module.exports = server;