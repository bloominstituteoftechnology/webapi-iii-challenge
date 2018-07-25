const express = require('express');
const helmet = require('helmet');

const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');
const users = require('./data/helpers/userDb');

const port = 8000;
const server = express();

server.use(helmet());
server.use(express.json());


server.listen(port, () => console.log(`Server is listening on port ${port}`))