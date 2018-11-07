const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
// const cors = require("cors");
const postDB = require("../data/helpers/postDb");
const tagDB = require("../data/helpers/tagDb");
const userDB = require("../data/helpers/userDb");

const server = express();

//middlewares
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
// server.use(cors({ origin: "http://localhost:3000" }));

//endpoints
server.get("/api/users", (req, res) => {
  userDB
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "the post info could not be received", err });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDB
    .get(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "the post with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "the post info could not be received" });
    });
});

server.post("/api/users", (req, res) => {
  console.log("body", req.body);
  userDB
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error while saving the post to the database", err });
    });
});

// server.put("/api.users/:id", (req, res));

module.exports = server;
