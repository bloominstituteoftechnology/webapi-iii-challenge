const express = require('express');
const cors = require('cors');
// const helmet require('helmet');
const server = express();

const usersRoute = require('./users/userRoutes');
const postsRoute = require('./posts/postsRoutes');
const tagsRoute = require('./tags/tagsRoutes');

server.use(express.json());
server.use(cors());

server.use(express.json());
server.use(cors());
// server.use(helmet());

//routes
server.use('/api/users', usersRoute);
server.use('/api/posts', postsRoute);
server.use('/api/tags', tagsRoute);
server.listen(3500, console.log('Listening'));