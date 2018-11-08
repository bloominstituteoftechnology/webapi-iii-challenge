const express = require('express');

const users = require('../data/helpers/userDb');
const posts = require('../data/helpers/postDb');
const usersRouter = require('../users/usersRouter.js');
const postsRouter = require('../posts/postsRouter.js');

const server = express();
server.use(express.json());

const sendErrorMsg = (errCode, msg, res) => {
    res.status(errCode);
    res.json({ Error: msg });
}

// Users endpoints //

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);


module.exports = server;