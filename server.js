const express = require('express');

const userRoutes = require('./data/users/users-router');
const postRoutes = require('./data/posts/posts-router');


const server = express();

server.get('/', (req, res) => {
    res.send('Hello World')
});

server.use('/users', userRoutes);
server.use('/posts', postRoutes);


module.exports = server;