// Server Imports
const express = require('express');

const helmet = require('helmet');
const cors = require('cors');

// Routes
const usersRouter = require('./data/Routers/users.js');
const postsRouter = require('./data/Routers/post.js');
const tagsRouter = require('./data/Routers/tag.js');

// Server
const server = express();

// Logger
const logger = (req, res, next) => {
  console.log('d-(OvO")z looks correct to me', req.body);

  next();
};

// Middleware
server.use(express.json());
server.use(logger);
server.use(helmet());
server.use(cors());

// Server Code
server.get('/', (req, res) => {
  // API Check
  res.json({ api: 'Running..' });
});

// Routes
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);
server.use('/api/tags', tagsRouter);

// Port
const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
