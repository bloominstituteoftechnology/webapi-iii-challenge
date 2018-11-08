const express = require('express');
const server = express();
const cors = require('cors');

const configureMiddleware = require('../config/middleware.js');


configureMiddleware(server);
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

module.exports = server;
