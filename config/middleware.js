const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

 module.exports = server => {
  server.use(helmet()); 
  server.use(express.json()); 
  server.use(morgan('short')); 
  server.use(cors()); 
};