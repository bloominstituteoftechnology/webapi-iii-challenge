//import dependencies
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");

//import db objects
const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");

//instantiate server
const server = express();

//set up middleware
const makeUpperCase = (req, res, next) => {
  const newName = req.body.name.toUpperCase();
  req.name = newName;
  next();
};

//use middleware
server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello node blog");
});

//User CRUD uperations
server.get("/api/users", (req, res) => {
  const promise = userDb.get();
  promise
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.send(err));
});

server.post("/api/users", makeUpperCase, (req, res) => {
  const newUser = { name: req.name };
  const promise = userDb.insert(newUser);
  promise
    .then(idObj => {
      if (!idObj) {
        res.status(500).json({ error: "There was an error creating the user" });
      } else {
        userDb
          .get(idObj.id)
          .then(user => res.status(200).json(user))
          .catch(err =>
            res
              .status(500)
              .json({ error: "There was an error creating the user" })
          );
      }
    })
    .catch(err => res.send(err));
});

server.put("/api/users/:id", makeUpperCase, (req, res) => {
  const id = req.params.id;
  const updatedUser = { name: req.name, id: id };
  const promise = userDb.update(id, updatedUser);
  promise
    .then(numOfRecords => {
      if (numOfRecords === 0) {
        res.status(500).json({ error: "There was an error updating the user" });
      } else {
        res.status(200).json({ message: "User was updated successfully" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "There was an error with that request" })
    );
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const promise = userDb.remove(id);
  promise
    .then(numOfRecords => {
      if (numOfRecords === 0) {
        res.status(500).json({ error: "There was an error removing the user" });
      } else {
        res.status(200).json({ message: "User has been removed" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "There was an error removing the user" })
    );
});

//Get all posts by a user
server.get("/api/users/:id/posts", (req, res) => {
  const id = req.params.id;
  const promise = userDb.getUserPosts(id);
  promise
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.send(err));
});

//POSTS CRUD operations
server.get("/api/posts", (req, res) => {
  const promise = postDb.get();
  promise
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.send(err));
});

//listen on port 80
const port = 9000;
server.listen(port, () => {
  console.log("server is running");
});
