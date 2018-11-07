const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('short'));


module.exports = server;