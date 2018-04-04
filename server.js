const express = require('express');

const postRouter = require('./posts/postRouter');
const tagRouter = require('./tags/tagRouter');
const userRouter = require('./users/userRouter');

const server = express();

// middleware


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
