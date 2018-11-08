const express = require('express');

const configureMiddleware = require('../config/middleware');

const server = express();

 // middleware
configureMiddleware(server);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
  });

 module.exports = server;