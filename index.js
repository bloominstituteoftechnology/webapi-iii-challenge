const express = require('express');

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

const server = express();

const PORT = 5000;

server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.listen(PORT, err=>{
    console.log(`Server running on port: ${PORT}`);
});