//import node mods
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

const postRouter = require('../posts/postRouter.js');
const usersRouter = require('../users/usersRouter.js')


//middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

//custom middleware here
//global middleware
//server.use(nameUpper);

// configure endpoints (route handlers are middleware!!)

//POSTS
server.use('/api/posts', postRouter);

//USERS
server.use('/api/users', usersRouter);

module.exports = server;