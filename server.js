const express = require('express');

const postRouter = require('./data/helpers/posts/postRouter');
const userRouter = require('./data/helpers/users/userRouter');

const server = express();

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);
server.use(express.json());


server.get('/', (req, res) => {
  res.send(` <h1>Hello From The API</h1>`)
})

module.exports = server;