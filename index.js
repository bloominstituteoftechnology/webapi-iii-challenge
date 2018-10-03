// Pull in my dependencies
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const port = 8000;
const helmet = require("helmet");
const knex = require("knex");
const sqlite3 = require("sqlite3");
const db = require("./data/helpers/userDb");

// Instantiate my server
const server = express();

server.use(express.json());

// MIDDLEWARES

const yell = (req, res, next) => {
  req.name = req.params.name.toUpperCase();
  next();
};

// CRUD operations & endpoints

server.get("/", (req, res) => {
  res.send("<h1>Go to /users</h1>");
});

server.get("/users", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: "No Users Coming :(" }));
});

server.get("/users/:id", (req, res) => {
  db.getUserPosts(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => res.status(500).send({ error: "You messed up" }));
});

server.post("/users", (req, res) => {
  const { name } = req.body;
  const newUser = { name };
  if (!name) {
    return res.status(400).json({ error: "Please provide a name." });
  }
  db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "An error has occurred while saving this post" })
    );
});

server.delete("/users", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deleteUser => {
      if (deleteUser) {
        res.status(200).json({ message: "Deleted Successfully!" });
      } else {
        res
          .status(404)
          .json({ error: `The user with specified Id: ${id}, does not exist` });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Cannot remove user" });
    });
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  db.update(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.json({ error: "Cannot change user" });
    });
});

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));
