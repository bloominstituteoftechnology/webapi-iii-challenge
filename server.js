const express = require('express');

const userRouter = require('./users/userRouter.js');
const tagRouter = require('./tags/tagRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

function uppercasemachine (req, res, next) {
    res.send(req.body.toUpperCase());
    next();
}

//server.use(uppercasemachine);

server.use(express.json());
server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);
server.use('/api/users', userRouter);

const port = 5000;
server.listen(port, () => console.log('API launched on port 5000'));