const express = require('express');

const server = express();

server.use(express.json());

const postRouter = require('./data/postRoutes/postRoutes');

server.use('./api/posts', postRouter);

module.exports = server;