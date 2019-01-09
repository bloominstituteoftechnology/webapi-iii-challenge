// import modules
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

// init server
const server = express();

// apply middleware
server.use(bodyParser());
server.use(cors());
server.use(helmet());
server.use(morgan('short'));

module.exports = server; 