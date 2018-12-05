const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDB');
const tagDB = require('./data/helpers/tagDB');

const server = express();
const port = 4500;

server.use(express.json());
server.use(logger('dev'));
server.use(helmet());


server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});