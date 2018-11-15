const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const start = express();

// middleware
// ORDER MATTERS! they will execute top to bottom
start.use(express.json());
start.use(helmet());
start.use(morgan('dev'));

// endpoints (route handlers are middleware!!)

start.get('/', (req, res) => {
  res.status(200).json({ api: 'Server is operational'});
});

module.exports = start;
