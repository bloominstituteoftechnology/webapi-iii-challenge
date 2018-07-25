const express = require('express');
const server = express();
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

server.use(express.json());


server.listen(8000, () => console.log('API running on port 8000'));
