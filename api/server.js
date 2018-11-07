
const express = require('express');
const server = express();
const userRoutes = require('../users/userRoutes');
const postRoutes = require('../posts/postRoutes');

//MIDDLEWARE DECLARATIONS
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

//MIDDLEWARE USE
server.use(cors());
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json())

//USERS
server.use('/users', userRoutes);

//POSTS
server.use('/posts', postRoutes);



module.exports = server;