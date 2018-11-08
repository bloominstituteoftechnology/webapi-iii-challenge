const express = require('express');
const server = express();
const configMidleware = require('./config/middleware');

configMidleware(server);

server.get('/', (req, res) => {
	res.json('alive');
});

module.exports = server;
