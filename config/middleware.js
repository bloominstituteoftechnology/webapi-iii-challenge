const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const usersRouter = require('../routers/usersRouter.js');
const postsRouter = require('../routers/postsRouter.js');
const tagsRouter = require('../routers/tagsRouter.js');

module.exports = server => {
    server.use(express.json());
    server.use(helmet());
    server.use(morgan('dev'));

    server.use('/users', usersRouter);
    server.use('/posts', postsRouter);
    server.use('/tags', tagsRouter);
};