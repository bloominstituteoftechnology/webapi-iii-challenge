const express = require("express");
const server = express();

// const db = require("./data/db.js");

server.use(express.json());

// add your server code starting here

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(8000, () => console.log("API running on port 8000"));
