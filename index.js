const express = require("express");
const userDb = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");

const server = express();

server.use(express.json());

const upperCase = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

server.get("/", (req, res) => {
  res.send("Welcome!");
});

server.get("/api/users", (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

server.get("/api/users/:id", (req, res) => {
  userDb
    .get(req.params.id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

server.listen(5000, () => console.log("API running on port 5000"));