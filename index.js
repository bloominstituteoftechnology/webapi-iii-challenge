// Import Node Modules
const express = require('express');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');

const helmet = require('helmet')
const logger = require('morgan')
const server = express();
const PORT = 4400;

const userRouter = require('./routers/user_router');

const postRouter = require('./routers/post_router');

server.use(
    express.json(),
    helmet(),
    logger('tiny'),
    );

server.use(express.json());
server.use('/users', userRouter);
server.use('/posts', postRouter);

// Listening

server.listen(PORT, () => {
    console.log(`Server is running and listening to ${PORT}`);
})