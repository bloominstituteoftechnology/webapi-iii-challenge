const express = require('express');
const usersRoutes = require('./UsersRoutes/usersRoutes.js');
const postsRoutes = require('./PostsRoutes/postsRoutes.js');
const helmet = require('helmet');
const port = 6000;

// SERVER SETUP
const server = express();
server.use(express.json());
server.use(helmet());

// ROUTE HANDLERS
server.use('/users', usersRoutes);
server.use('/posts', postsRoutes);

// PORT LISTENERS
server.listen(port, () => console.log(`Server is running on ${port}!`));
