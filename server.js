const express = require('express');

const postRouter = require('./users/userRouter.js');
const tagRouter = require('./tags/tagRouter.js');
const userRouter = require('./posts/userRouter.js');

const server = express();

// uppercase middleware

server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);
server.use('/api/users', userRouter);

const port = 5000;

server.listen(port, () => console.log('API launched on port 5000'));