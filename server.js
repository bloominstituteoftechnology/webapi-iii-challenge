const express = require('express');
const cors = requite('cors');
// database helpers
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors());


// server.get('/api/users')
// server.get('/api/posts')
// server.get('/api/tags')