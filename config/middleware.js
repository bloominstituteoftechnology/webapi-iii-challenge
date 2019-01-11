const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

module.exports = server => {
  server.use(helmet()); // hides your tech stack from sniffers
  server.use(express.json()); // built-in
  server.use(morgan('short')); // logging middleware
  server.use(cors()); // allows domains/ports to connect to your server
};
