const express = require('express');


const tagRouter = require('./tag/tagRouter');
const userRouter = require('./user/userRouter');
const postRouter = require('./post/postRouter');


const server = express();

const configureMiddleware = require('./config/middleware');



configureMiddleware(server);

server.get('/', (req, res) => {
    res.status(200).json({ api: "it runs" });
})

// POST DATA
server.use('/post', postRouter);

// USER DATA
server.use('/user', userRouter);

// TAG DATA
server.use('/tag', tagRouter);

module.exports = server;
