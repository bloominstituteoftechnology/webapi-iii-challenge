const express = require('express');
const logger = require('morgan');

const server = express();
const parser = express.json();
const logMiddleware = logger('dev');

server.use(parser, logMiddleware);

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Node Blog</h2>
    <p>Welcome to David's Node Blog</p>
    `);
});

module.exports = server;
