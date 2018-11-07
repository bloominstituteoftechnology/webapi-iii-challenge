const express = require("express");
const userDb = require("../data/helpers/userDb.js");
const postDb = require("../data/helpers/postDb.js");

const gateKeeper = require("../middleware/gateKeeperMiddleWare.js");
const uppercase = require("../middleware/uppercaseMiddleWare.js");

const server = express();

server.use(express.json());

// all users
server.get("/api/users", (req, res) => {
  userDb
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// user by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .get(id)
    .then(user => {
      if (user.length !== 0) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// all posts
server.get("/api/posts", (req, res) => {
  postDb
    .get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// posts by user id
server.get("/api/posts/:id", gateKeeper, (req, res) => {
  const { id } = req.params;
  const userId = id;

  userDb
    .getUserPosts(userId)
    .then(post => {
      if (post.length !== 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// posts by post id
server.get("/api/post/:id", (req, res) => {
  const { id } = req.params;

  postDb
    .get(id)
    .then(post => {
      if (post.length !== 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// add new user
server.post("/api/users", uppercase, (req, res) => {
  userDb
    .insert(req.body)
    .then(user => {
      return userDb
        .get(user.id)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(error => {
          res.status(500).json({
            error: "There was an error while saving the user to the database"
          });
        });
    })
    .catch(error => {
      res.status(400).json({
        errorMessage: "Please provide a name."
      });
    });
});

// delete user
server.delete("/api/users/:id", (req, res) => {
  userDb
    .remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

// update a user
server.put("/api/users/:id", uppercase, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  userDb
    .update(id, changes)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the spucified ID does not exist." });
      }
    //   res.status(400).json({ errorMessage: "Please provide a name" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information can not be modified." });
    });
});

module.exports = server;
