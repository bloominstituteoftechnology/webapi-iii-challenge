// Imports
const express = require('express');
const configMiddleware = require('./middleware/middleware.js');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');

// Create server
const server = express();

// Middleware
configMiddleware(server);

// Routes
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

// Server export
module.exports = server;
