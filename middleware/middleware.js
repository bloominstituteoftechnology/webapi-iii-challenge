const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');

module.exports = server => {
  server.use(morgan('dev'));
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
};
