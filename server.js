const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5555;
const server = express();
server.use(cors({ origin: "http://localhost:3000" }));

server.get('/api/users');
server.get('/api/posts');
server.get('/api/tags');



server.listen(port, () => console.log(`Server running on port ${port}`));