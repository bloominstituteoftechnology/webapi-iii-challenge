const express = require('express');
const helmet = require('helmet');
const userRoutes = require('./resources/users');
const postsRoutes = require('./resources/posts');
const tagRoutes = require('./resources/tags');

const server = express();

server.use(express.json()); // built-in middleware
server.use(helmet()); // security buffer for server - form of middleware

// test server
server.get('/', (req, res) => res.send('your server is working'));


/**************** USERS ****************/
server.use('/users', userRoutes);

/**************** POSTS ****************/
server.use('/posts', postsRoutes);

/**************** TAGS ****************/
server.use('/tags', tagRoutes);


server.listen(5000);