// Import Express
const express = require('express');

// Create server and connect Express
const server = express();

server.use(express.json());

const port = 8000;

server.listen(8000, () => console.log(`---Server is running on ${port}!`));
