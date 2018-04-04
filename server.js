const express = require("express");

const server = express();

const db = require("./data/dbConfig.js");

const port = 5000;
server.listen(port, () => {
  console.log("API Running");
});
