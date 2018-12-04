const express = require('express');
const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');

const server = express();
const NUM = 4444;

server.listen(NUM, () => console.log(`listening on port ${NUM}`))