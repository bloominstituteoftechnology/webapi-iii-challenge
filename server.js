const express = require('express');
const helmet = require('helmet'); // 1 yarn add helment || npm i helmet // 2
const cors = require('cors');

const { logger, greeter, errorHandler } = require('./middleware');

// import db from './data/db';
const userRoutes = require('./users/userRoutes');

const server = express();
// client -> [error, m1, post, m3] -> [rh1, rh2]

// add middleware
// server.use(greeter('Lukasz'));
server.use(express.json());
server.use(cors());
// server.use(logger('loading'));
server.use(helmet()); // 3

// user route handlers
server.use('/api/users', userRoutes);

server.get('/', logger(), (req, res) => {
  res.json({ api: 'running' });
});

server.use(errorHandler);

const port = 8000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));
