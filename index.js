const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger= require('morgan');
const server = express();
const PORT = 5050;
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

server.use((req, res, next) =>{
    if(req.body){
        req.body.name = req.body.name.toUpperCase()
        next()
    }else{
        next()
    }
});

server.use(express.json());
server.use(helmet());
server.use(logger('dev'));
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);


server.listen(PORT, () =>{
    console.log('Server is running')
});