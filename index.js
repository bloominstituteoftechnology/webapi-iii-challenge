const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();
const PORT = 4040;

// middleware
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));

server.get('/', (req, res) => {
  res.status(404).json({ message: 'server is running' });
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
