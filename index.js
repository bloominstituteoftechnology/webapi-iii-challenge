// console.log('something is running! YO!');

const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

const PORT = 5050;

server.use(express.json());
server.use(helmet());
server.use(logger('dev'));

server.get('/', (req, res) => {
    res.json({message: "request recieved!"})
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});