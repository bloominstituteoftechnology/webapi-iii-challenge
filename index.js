require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

const userRoutes = require('./data/helpers/userRoutes.js');
const postRoutes = require('./data/helpers/postRoutes.js');

const server = express();
PORT = process.env.PORT || 4000;

server.use(express.json());
server.use(helmet());

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

server.get('/', (req, res) => {
  res.send('Hello');
});

server.listen(PORT);
