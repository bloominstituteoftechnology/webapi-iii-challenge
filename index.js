// node dependencies
const express = require('express');
const server = express();

// database
const userDb = require('./data/helpers/userDb');

server.use(express.json());

const port = 5000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);