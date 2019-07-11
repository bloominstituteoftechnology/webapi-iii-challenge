const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter')
// ES 6 version
// import express, { json } from 'express';
// import userRouter from './users/userRouter';

function logger(req, res, next){
    console.log('Request method: ', req.method);
    console.log('Request URL: ', req.url);
    console.log('Request timestamp: ', new Date());
    next();
}

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.listen(5000, () => {
  console.log('\n*** Server Running on http://localhost:5000 ***\n');
});