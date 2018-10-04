// pull in express
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// instanciate your server
const port = 8000;
const userRoutes = require('./Users/userRoutes');
const postRoutes = require('./Posts/postRoutes');

const server = express();
server.use(express.json(), cors(), helmet(), logger('combined'));

// ROUTER HANDLERS

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

server.listen(port, () => {
  console.log(`\n=== API running on port: ${port} ===\n`);
});
