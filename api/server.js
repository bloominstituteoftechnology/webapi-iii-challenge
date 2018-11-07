const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

// order matters
server.use(express.json());
server.use(helmet());
server.use(morgan('short'));

module.exports = server;