const express = require('express');
const server = express();
const helmet = require ('helmet');
const logger = require('morgan');

server.use(express.json());
server.use(helmet());
server.use(logger('dev'))

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});






module.exports = server;
