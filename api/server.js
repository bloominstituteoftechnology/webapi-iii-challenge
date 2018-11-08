const express = require('express');

const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');

const server = express();

// Middleware
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

module.exports = server;
