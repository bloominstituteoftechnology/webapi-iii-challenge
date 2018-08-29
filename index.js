const express = require("express");
const server = express();

const db = require("./data/dbConfig.js");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Working Server");
});

server.listen(8000, () => console.log("\n++ API on port 8k ==\n"));
