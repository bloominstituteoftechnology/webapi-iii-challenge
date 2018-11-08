const express = require('express');
const cors = require('cors');

module.exports = app => {
  // ORDER MATTERS! they will execute top to bottom
  app.use(express.json());
  app.use(cors()); // third party
};



