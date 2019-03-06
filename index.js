const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const userRoutes = require('./data/helpers/userRoutes.js');
const postRoutes = require('./data/helpers/postRoutes.js');

const server = express();

server.use(express.json(), logger('dev'), helmet());
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

server.get('/', (req, res) => {
  res.send('Hello');
});

server.listen(4000);
