//import dependencies
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");

//instantiate server
const server = express();

server.get("/", (req, res) => {
  res.send("hello node blog");
});

//listen on port 80
const port = 9000;
server.listen(port, () => {
  console.log("server is running");
});
