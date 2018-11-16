const express = require('express');
const configureMiddleware = require('../middleware/middleware.js')

const start = express();

// middleware
configureMiddleware(start);

// custom
const capitalizer = require('../capitalizer/capitalizerMiddleware.js')


// configure endpoints (route handlers are middleware!!)
start.get('/', (req, res) => {
  res.status(200).json({ api: 'Server is operational'});
});


module.exports = start;
