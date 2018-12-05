const express = require('express');
const server = express();
const PORT = 5000;
const helmet = require('helmet');
const morgan = require('morgan');
const capitalize = require('./middleware.js')

server.use(
  express.json(),
  morgan('tiny'),
  helmet()
)

server.use(capitalize);




server.listen(port,() => {
  console.log(`Server is listenening on port ${PORT}`)
});