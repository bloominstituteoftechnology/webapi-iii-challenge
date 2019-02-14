const express = require('express');

const usersRouter = require('./data/users/usersRouter');

const postsRouter = require('./data/posts/postsRouter');

const server = express();

server.use(express.json());

const cors = require('cors');

server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.get('/', async (req, res) => {
  res.send(
    `<h1>Server Running...</h1> \n<p>Navigate to /api/users to see list of users</p>\n<p>Navigate to /api/posts to see list of posts</p>
    `,
  );
});

module.exports = server;
