const express = require('express');
const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');
const tagDB = require('./data/helpers/tagDb');

const server = express();

const port = 9000;
server.listen(port, () => console.log(`The port is OVER ${port}!!`));
