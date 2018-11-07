const express = require("express");
const server = express();

const postDB = require("./data/helpers/postDb.js");
const userDB = require("./data/helpers/userDb.js");
const tagDB = require("./data/helpers/tagDb.js");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("<h1>THIS IS THE <em>root directory</em></h1>");
});

server.listen(9000, () => console.log("server be runnin: port 9000"));
