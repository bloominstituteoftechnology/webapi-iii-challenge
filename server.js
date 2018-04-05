// Server Imports
const express = require('express');

const helmet = require('helmet');
const cors = require('cors');

const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

const usersRouter = require('./data/Routers/users.js');

// Server
const server = express();

// Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

// Logger
const logger = (req, res, next) => {
  console.log('d-(OvO")z looks correct to me', req.body);

  next();
};

// Server Code
server.get('/', (req, res) => {
  // API Check
  res.json({ api: 'Running..' });
});

// Routes
server.use('/api/users', usersRouter);

// Port
const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
