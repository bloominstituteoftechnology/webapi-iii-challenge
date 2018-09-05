const express = require("express");
const postDb = require("./data/helpers/postDb");
const userDb = require("./data/helpers/userDb");
const server = express();

const upercaseChecker = (req, res, next) => {};

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello");
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

server.get("/users", (req, res) => {
  userDb
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error("error", err);
    });
});

server.listen(8000, () => console.log("Up and running"));
