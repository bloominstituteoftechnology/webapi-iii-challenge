//https://github.com/LambdaSchool/Node-Blog/pull/360

const express = require('express');
const userRouter = require('../users/userRouter.js');
const postRouter = require('../post/postRouter.js');

const server = express();

server.use(express.json());

//posts
server.use('/api/posts', postRouter );

//users
server.use('/api/users', userRouter );


module.exports = server;