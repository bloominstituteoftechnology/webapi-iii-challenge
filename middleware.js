const express = require('express');
const cors = require('cors');

module.exports = server => {
  server.use(express.json()); 
  server.use(cors());
  server.use(errorHandler);
  
  function errorHandler(err, req, res, next) {
    console.error(err);
  
    switch (err.statusCode) {
      case 404:
        res.status(404).json({
          message: 'that file aint herrrrrrre',
        });
  
        break;
  
      default:
        res.status(500).json({
          message: 'There was an error performing the required operation',
        });
        break;
    }
  }
  

};
