const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();
const PORT = 3000;

server.use(
  express.json(),
  logger('tiny'),
  helmet(),
);

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
});