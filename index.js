// pull in express
const express = require('express');

// create server/connect to express

const server = express();

server.use(express.json());

const port = 5000;

server.listen(5000, () => console.log(`---- Server Awake On ${port}!! ----`));
