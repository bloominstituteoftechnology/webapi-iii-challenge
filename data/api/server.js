const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postsRouter = require('../posts/postsRouter.js');
const userRouter = require('../users/userRouter.js')

const start = express();

// middleware
// ORDER MATTERS! they will execute top to bottom
start.use(express.json()); // built in
start.use(morgan('dev')); // third party
start.use(helmet()); // third party

// custom

// endpoints (route handlers are middleware!!)
start.get('/', (req, res) => {
  res.status(200).json({ api: 'Server is operational'});
});

module.exports = start;
