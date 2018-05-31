const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig.js');

const port = 5555;
const server = express();
server.use(express.json());
//server.use(cors({ orign: 'https://localhost:3000' }));


//database helpers
// const posts = require('./data/helpers/postDb.js')
// const users = require('./data/helpers/userDb.js')
// const tags = require('./data/helpers/tagDb.js')
// server.get('/api/users')
// server.get('/api/posts')
// server.get('/api/tags')