const express = require('express');
const server = express();
const middleware = require('./data/config/middleware');
const userRoutes = require('./data/users/userRoutes');
const postRoutes = require('./data/posts/postRoutes');

middleware(server);
server.use('/users', userRoutes);
server.use('/posts', postRoutes);


server.listen(7000);