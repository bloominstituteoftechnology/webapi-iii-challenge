const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');


module.exports = server => {
  // ORDER MATTERS! they will execute top to bottom
  server.use(express.json()); // built in
  server.use(helmet()); // third party
  server.use(morgan('short')); // third party
  server.use(cors());
};