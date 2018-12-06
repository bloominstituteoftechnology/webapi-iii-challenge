const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const usersRouter = require('./routers/users');
const postsRouter = require('./routers/posts');

const server = express();
const PORT = 4040;

// middleware
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.json({ message: 'server is running' });
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
