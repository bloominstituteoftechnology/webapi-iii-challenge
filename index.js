const express = require('express');
const cors = require('cors');

const postsRouter = require('./posts-router');
const usersRouter = require('./users-router');

const server = express();
const PORT = 5050;

server.use(express.json(), cors());
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`));