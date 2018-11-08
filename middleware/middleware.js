const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');

module.exports = server => {
  server.use(morgan('dev'));
  server.use(helmet());
  server.use(express.json());
};
