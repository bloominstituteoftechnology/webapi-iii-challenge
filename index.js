const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();
const PORT = 5050;

// middleware
// 1) built-in
// 2) 3rd party library
// 3) custom
server.use(
    express.json(),
    logger('tiny'), // look up morgan format options
    helmet()
);

// route handlers
server.get('/', (req,res) => {
  res.status(404).json({message: 'request received.'});
})

server.listen(PORT, err => {
  console.log(`Listening on port ${PORT}`)
})