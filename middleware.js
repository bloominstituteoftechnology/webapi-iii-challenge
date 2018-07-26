const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

module.exports = app => {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
};
