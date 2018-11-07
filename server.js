/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json(), cors());


server.listen(8000, () => {
  console.log('Running on port 8000');
});
