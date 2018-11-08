const express = require("express");
const users = require("./data/helpers/userDb");
const posts = require("./data/helpers/postDb");
const tags = require("./data/helpers/tagDb");
const port = 9000;

const server = express();
server.use(express.json());

// Middleware

const uppercaseMiddleware = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

// Getting all users

server.get("/api/users", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: "Users can not be retrieved",
        error: err
      });
    });
});

// Getting Individual Users

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users
    .get(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "User does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not retrieve user" });
    });
});

server.listen(port, () => console.log(`\nServer listening on port ${port}`));
