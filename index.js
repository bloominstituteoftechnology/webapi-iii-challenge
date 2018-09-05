const express = require("express");
const postDb = require("./data/helpers/postDb.js");
const userDb = require("./data/helpers/userDb.js");
const server = express();

const upercaseChecker = (req, res, next) => {};

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello");
});

server.get("/users", (req, res) => {
  //   console.log(userDb.user)
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "The USER data could not be retrieved." });
    });
});

const port = 8000;

server.listen(port, err => {
  console.log(`\n=== The server is up and running on ${port} ===\n`);
});

// server.get("/posts", (req, res) => {
//     console.log(postDb)
//   postDb
//     .find()
//     .then(posts => {
//       res.status(200).json(posts);
//     })
//     .catch(err => {
//       console.error("error", err);
//     });
// });
