const express = require('express');
const dbTag = require('./data/helpers/tagDb.js');
const usersRouter = require('./users/usersRouter');
const postsRouter = require('./posts/postsRoutes');

const server = express();

server.use(express.json());
server.use('/users', usersRouter);
server.use('/posts', postsRouter);

// Root response
server.get('/', (req, res) => {
   console.log('something');
});

const port = 9000;

server.listen(port, () => console.log(`\n API running on port ${port} \n`));

