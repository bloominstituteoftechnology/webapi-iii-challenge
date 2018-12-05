const express = require('express');
const morgan = require('morgan');

const userDB = require("./data/helpers/userDb");
const postDB = require("./data/helpers/postDB");

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(morgan('dev'));

server.get("/users", (req, res) => {
    userDB.get()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).json({ error: "Error getting users" });
      });
});

server.get("/user/:id", (req, res) => {
    const { id } = req.params;
    userDB.get(id)
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "User with specified ID is not found" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Could not get user" });
      });
  });


server.listen(PORT, err => {
    console.log(`Server listening on port ${PORT}`);
});