const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
const postRouter = require('./routes/Post-router');
const userRouter = require('./routes/User-router');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


server.use('/api/users', userRouter);

module.exorts = server;