const express = require("express");
const users = require("./data/helpers/userDb");
const posts = require("./data/helpers/postDb");
const tags = require("./data/helpers/tagDb");
const port = 9000;

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  console.log("Up and ready");
});

server.listen(port, () => console.log(`\nServer listening on port ${port}`));
