/* --- Dependencies --- */
const express = require('express');
const server = express();
// Middleware Dependencies
const helmet = require('helmet');
const cors = require('cors');
// Routes
const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');
const tagRoutes = require('./tags/tagRoutes');

/* --- Middleware --- */
server.use(helmet());
server.use(cors({ origin: 'http://localhost:3000' }));
server.use(express.json());

/* --- Endpoints --- */
// Users
server.use('/api/users', userRoutes);
// Posts
server.use('/api/posts', postRoutes);
// Tags
server.use('/api/tags', tagRoutes);

/* Server Start! */
const port = 5000;
server.listen(port, () => console.log(`\n=== Server is listening at port ${port} ===\nSever Start Time: ${Date()}`));

