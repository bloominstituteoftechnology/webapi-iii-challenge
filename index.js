const express = require('express');
const server = express();
const PORT = 5000;
const helmet = require('helmet');
const morgan = require('morgan');

server.use(
  express.json(),
  morgan('tiny'),
  helmet()
)