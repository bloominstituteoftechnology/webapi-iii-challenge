const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const postRouter = require('../posts/postRouter.js');


module.exports = (server) => {
    server.use(express.json());
    server.use(helmet());
    server.use(morgan('short'));
    server.use('/api/users/posts', postRouter)
}