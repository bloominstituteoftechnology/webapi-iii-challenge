const express = require('express');
const helmet = require('helmet');
const cors = require('cors');



module.exports = server => {
  server.use(express.json()); // this teaches express how to parse JSON information from req.body
  server.use(helmet());
  server.use(cors());

};
