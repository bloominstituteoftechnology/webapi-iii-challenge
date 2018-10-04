const db = require('./data/helpers/userDb');
const userRoutes = require('./users/usersRoute.js');
const postsRoutes = require('./posts/postsRoutes.js');

const express = require('express');
const cors = require('cors');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');

// Server Invocations
server.use(express.json());
server.use(logger('combined'));
server.use(cors());
server.use(helmet());



server.use('/users', userRoutes);
server.use('/posts', postsRoutes);

const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));