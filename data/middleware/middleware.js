const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const postsRouter = require('../posts/postsRouter.js');
const userRouter = require('../users/userRouter.js');


module.exports = start => {
// ORDER MATTERS! they will execute top to bottom
start.use(express.json()); // built in
start.use(morgan('dev')); // third party
start.use(helmet()); // third party
start.use('/api/users', userRouter);
start.use('/api/posts', postsRouter);
}