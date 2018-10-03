// add imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");

// add data helpers
// users data
const users = require("./data/helpers/userDb");

// instantiate server
const server = express();

// add global middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("combined"));

// add a home route
server.get("/", (req, res) => {
  res.json({ hello: "hello World" });
});

// listen to port 8000 and give a startup message from the server
server.listen(8000, () => console.log("API listening on port 8000"));
