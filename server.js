const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
const tagsRouter = require('./tags/tagRouter.js');

const server = express();

// custom middlware [m1, m2, mn] -> [request handlers]
function logger(req, res, next) {
    // next points to the next middleware
    console.log(`requesting: ${req.url}`);

    next();
}

// middleware
server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postsRouter);
server.use('api/tags', tagRouter)

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));