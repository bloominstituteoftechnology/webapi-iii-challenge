const express = require('express');

const usersRouter = require('./data/users/usersRouter')


const postsRouter = require('./data/posts/postsRouter')

const server = express();

server.use(express.json());

const cors = require('cors')

server.use(cors())

server.use('/api/users', usersRouter)

server.get('/', async (req, res) => {
  res.send(
    `<h1>Server Running...</h1>
    `);
});


module.exports = server;