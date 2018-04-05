const tagDb = require('./data/helpers/tagDb.js');
const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');

const express = require('express');
const server = express();
//cors for browser client

const usersRoute = require('./users/usersRoute.js');
const postsRoute = require('./posts/postsRoute.js');
const tagsRoute = require('./tags/tagsRoute.js');

server.use(express.json());

  

const port =5004;
server.listen(port, () =>console.log('server running on port 5004'));