const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

//configure middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

//add the custom function or gatekeeper HERE

//configure endpoints (route handlers are middleware)
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

module.exports = server;