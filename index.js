const express = require('express');
const morgan = require('morgan');

const userDB = require("./data/helpers/userDb");
const postDB = require("./data/helpers/postDB");

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(morgan('dev'));

server.use((req, res, next) => {
    const name = req.body.name;

    if (!name) {
      res.status(400).json({ error: "name is required" });
    } else {
        const capitalizedString = name.toUpperCase();
        req.body.name = capitalizedString;
        next();
      } 
});

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

  server.post("/user", (req, res) => {
    const newUser = req.body;
    if (newUser.name === "") {
      res.status(400).json({ error: "name must include characters" });
    } else if (newUser.name.length > 128) {
      res.status(400).json({ error: "name must not exceed 128 characters" });
    } else {
        userDB.insert(newUser)
        .then(idInfo => {
          userDB.get(idInfo.id).then(user => {
            res.status(201).json(user);
          });
        })
        .catch(err => {
          res.status(500).json({ message: "There was an error saving the new user." });
        });
    }
  });

  server.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    userDB.remove(id)
      .then(count => {
        if (count) {
          res.json({ message: "The user was deleted." });
        } else {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "The user could not be removed." });
      });
  });

  server.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    if (updatedUser.name) {
        if (updatedUserBody.name === "") {
            res.status(400).json({ error: "name must include characters" });
          } else if (updatedUserBody.name.length > 128) {
            res.status(400).json({ error: "name must not exceed 128 characters" });
          } else {
            userDB.update(id, updatedUser)
            .then(count => {
                if (count) {
                    db.findById(id)
                        .then(post => {
                            res.json(post);
                    })
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The user information could not be modified." })
            });
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide your name" })
    }
  });


server.listen(PORT, err => {
    console.log(`Server listening on port ${PORT}`);
});