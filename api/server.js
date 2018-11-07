const express = require('express');

const server = express();

// configure middleware
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

module.exports = server;