const express = require("express");
const db = require("./data/dbConfig");
const logger = require("morgan");
const helmet = require('helmet')
const cors = require('cors')
const server = express();

server.use(express.json(), logger("tiny"), helmet(), cors());

const PORT = 5050;

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
