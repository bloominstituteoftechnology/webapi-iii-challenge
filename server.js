const express = require("express");
const morgan = require("morgan");
const server = express();

// const db = require("./data/db.js");

server.use(express.json());
server.use(morgan("dev"));

// add your server code starting here

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(8000, () => console.log("\n === API Running... ===\n"));
