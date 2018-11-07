const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const userDb = require("./data/helpers/userDb");

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("short"));
const port = 9000;

const sendUserError = (status, msg, res, err) => {
  res.status(status).json({ error: msg });
  console.error(err);
  return;
};

const upperCase = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

server.listen(port, () => {
  console.log(`\n=== Listening on port ${port} ===\n`);
});
