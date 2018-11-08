const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const usersRouter = require('../users/usersRouter');
const postsRouter = require('../posts/postsRouter');

module.exports = server => {
    server.use(express.json()); 
    server.use(helmet());
    server.use(morgan('short')); 

    server.use('/api', usersRouter);
    server.use('/api', postsRouter);
};
