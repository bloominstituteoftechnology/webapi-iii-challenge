const express = require('express');

const usersRouter = require('./users-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`Navigate to /api/users on the URL to get all the users then all their posts from /api/users/posts`)
});

server.use('/api/users', usersRouter);


module.exports = server;

