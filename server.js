const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const userRoutes = require('./users/userRoutes');
const postRoutes = require('./post/postRoutes');

server.use(express.json())
server.use(logger('short'));
server.use(helmet());
server.use(cors());

server.use('/users', postRoutes)
server.use('/users', userRoutes)

module.exports = server;