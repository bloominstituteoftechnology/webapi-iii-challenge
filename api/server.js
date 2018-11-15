const express = require('express');


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

module.exports = server;
