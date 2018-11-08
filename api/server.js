const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const postDB = require("../data/helpers/postDb");
const userDB = require("../data/helpers/userDb");

const server = express();

//middleware
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors({ origin: "http://localhost:3000" }));

const upperCase = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

//endpoints
server.get("/api/users", (req, res) => {
  userDB
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "the post info could not be received" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  console.log("get with ID", req.params);
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
      res.status(500).json({ message: "the post info could not be received", err });
    });
});

server.post("/api/users", upperCase, (req, res) => {
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

server.put("/api/users/:id", upperCase, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  console.log("put", changes, id);
  userDB
    .update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} posts updated` });
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error updating the post", err });
    });
});

server.delete("/api/users/:id", (req, res) => {
  userDB
    .remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating the post", err });
    });
});

module.exports = server;
