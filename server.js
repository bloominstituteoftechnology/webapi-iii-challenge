const express = require("express");
const users = require("./data/helpers/userDb");
const posts = require("./data/helpers/postDb");
const tags = require("./data/helpers/tagDb");
const port = 9000;

const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: "The users information can not be retrieved",
        error: err
      });
    });
});

server.listen(port, () => console.log(`\nServer listening on port ${port}`));
