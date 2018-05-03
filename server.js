const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./resources/users');
const postsRoutes = require('./resources/posts');
const tagRoutes = require('./resources/tags');
const server = express();

server.use(express.json()); // built-in middleware
server.use(cors()); // links server to application
server.use(helmet()); // security buffer for server - form of middleware

server.get('/', (req, res) => res.send('your server is working')); // test server

server.use('/users', userRoutes); // users
server.use('/posts', postsRoutes); // posts
server.use('/tags', tagRoutes); // tags

server.listen(5000);