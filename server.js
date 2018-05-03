const express = require('express');
const helmet = require('helmet'); // 1 yarn add helmet || npm i helmet 
const cors = require('cors');

// 2 import db from './data/db';
const userRoutes = require('./users/userRoutes');
const postRoutes = require('./users/postRoutes');
const tagRoutes = require('./user/tagRoutes');

const server = express();

// client -> [error, m1, post, m3] -> [rh1, rh2]

function logger(req, res, next) {
    next();
}

// add middleware
// server.use(greeter('Lukasz'));
server.use(logger);
server.use(helmet());
server.use(express.json());
server.use(cors());

// user route handlers
server.use('/api/users', userRoutes);
server.use('./api/posts', postRoutes);
server.use('./api/tags', tagRoutes);


server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

const port = 8000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));