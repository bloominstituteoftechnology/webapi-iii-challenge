// imports
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const port = 9000;
const helmet = require("helmet");

// Instantiate server
const server = express();
server.use(express.json());

//Instantiate database
const db = require("./data/dbConfig");
// imports-helpers
const userDb = require("./data/helpers/userDb");

// Middlewares

// Routers
//Get users
server.get("/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => console.error(err));
});

//Get user
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => console.error(err));
});

//Post user
server.post("/users", (req, res) => {
  const { name } = req.body;
  const newUser = { name };
  userDb
    .insert(newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => console.error(err));
});

//Delete user
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(removedUser => {
      res.status(200).json(removedUser);
    })
    .catch(err => console.error(err));
});

//Put user
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newUser = { name };
  userDb
    .update(id, newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => console.error(err));
});

// Call server
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
