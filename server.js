const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./users/userRoutes.js');
const postRoutes = require('./users/postRoutes.js');
const tagsRoutes = require('./users/tagRoutes.js');

const server = express();

function logger(req, res, next) {
  next();
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagsRoutes);

server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

const port = 8000;
server.listen(port, () => console.log('API Running on port 5000'));