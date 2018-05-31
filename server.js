// express
const express = require('express');
const db = require('./data/helpers/postDb.js');
const db1 = require('./data/helpers/tagDb.js');
const db2 = require('./data/helpers/userDb.js');
const cors = require('cors');
const port = 3000;
const server = express();

server.use(cors({ origin: 'http://localhost:3000' }));

// database helpers
const posts = require('./data/helpers/postDb.js')
const users = require('./data/helpers/userDb.js')
const tags = require('./data/helpers/userDb.js')
server.get('/api/users')
server.get('/api/posts')
server.get('/api/tags')




























app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});