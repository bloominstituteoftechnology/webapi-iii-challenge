const express = require("express");
const helmet = require("helmet");
// const morgan = require("morgan");
const cors = require("cors");
const postDb = require("../data/helpers/postDb");
const userDb = require("../data/helpers/userDb");
const server = express();

server.use(express.json());
server.use(helmet());
// server.use(morgan("short"));

server.get("/", (req, res) => {
  userDb
    .get()
    .then(users => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({error: "error"});
    });
});

module.exports = server;
