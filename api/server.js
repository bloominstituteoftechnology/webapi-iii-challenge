const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.use(express.json()); // built in
server.use(helmet()); // third party
server.use(morgan('short')); // third party



module.exports = server;