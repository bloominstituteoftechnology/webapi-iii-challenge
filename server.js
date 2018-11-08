// Imports
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');

// Create server
const server = express();

// Middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

// Routes
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

// Server export
module.exports = server;
