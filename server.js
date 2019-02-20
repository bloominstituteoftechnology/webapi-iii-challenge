const express = require('express');

const helmet =  require('helmet');

const userRoute = require('./data/helpers/userRouter.js');
const postRoute = require('./data/helpers/postsRouter.js');

const server = express();

//pull in global middleware:
server.use(express.json());
server.use(helmet());
server.use('/api/users', userRoute);
server.use('/api/posts', postRoute);





module.exports = server;


//server.js is where main functions and error handling takes place 