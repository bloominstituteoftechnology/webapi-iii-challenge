const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const post = require('../data/helpers/postDb.js');
const tag = require('../data/helpers/tagDb');
const userRouter = require('./user/userRouter');
const postRouter = require('./post/postRouter');

const server = express();
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({ api: "it runs" });
})
// POST DATA
server.use('/post', postRouter);

// USER DATA
server.use('/user', userRouter);



module.exports = server;
