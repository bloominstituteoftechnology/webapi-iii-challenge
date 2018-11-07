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

server.post("/api/users", (req, res) => {
  req.body.name
    ? userDb
        .insert(req.body)
        .then(userId =>
          userDb.get(userId.id).then(user => res.status(200).json(user))
        )
        .catch(err =>
          res.status(500).json({
            error: "There was an error while saving the user to the database"
          })
        )
    : res.status(400).json({ message: "Please provide a name for the user." });
});

server.put("/api/users/:id", (req, res) => {
  req.body.name
    ? userDb
        .update(req.params.id, req.body)
        .then(
          count =>
            count
              ? userDb
                  .get(req.params.id)
                  .then(user => res.status(200).json(user))
              : res.status(404).json({
                  message: "The user with the specified ID does not exist."
                })
        )
        .catch(err =>
          res.status(500).json({
            error: "The user information could not be modified."
          })
        )
    : res.status(400).json({ message: "Please provide a name for the user." });
});

server.listen(5000, () => console.log("API running on port 5000"));
