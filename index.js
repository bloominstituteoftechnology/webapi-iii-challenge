// const helmet = require("helmet");
// const users = require()
const express = require("express");
const server = express();
const cors = require("cors");
const db = require("./data/helpers/userDb");
const pb = require("./data/helpers/postDb");

server.use(express.json());
server.use(cors());

//add middleware
function upperCase(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

//global use of middleware
server.use(express.json());

//add routes
server.get("/users", (req, res) => {
  db.get()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "No users found" });
      }
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error getting the information" });
    });
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "No users found by that id" });
      }
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ message: "Error getting the information for each character" });
    });
});

server.post("/users/:id", upperCase, (req, res, next) => {
  // localhost:8000/users/5?test=test2&name=Vance
  // console.log(req.params, req.body, req.query);
  const id = req.params.id;
  const user = req.body;

  db.getUserPosts(id).then(posts => {
    if (posts) {
      res.status(201).json({ posts });
    } else {
      res.status(400).json({ message: "Error couldn't provide post content" });
    }
  });
});

server.put("/users/:id", upperCase, (req, res) => {
  const name = req.body.name;
  if (name) {
    db.update(req.params.id, req.body)
      .then(users => {
        if (users) {
          res.status(200).json({ users });
        } else {
          res.status(404).json({ message: "ID doesn't exist" });
        }
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({
          message: "Error getting the information for each character"
        });
      });
  } else {
    res.status(400).json({ message: "Please provide text" });
  }
});

server.listen(8000, () => console.log("\n== API on Port 8K"));
