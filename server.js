//import express from express
const express = require("express");

//import files
const users = require("./data/helpers/userDb");
const posts = require("./data/helpers/postDb");
const tags = require("./data/helpers/tagDb");

//declare server
const server = express();
//parse JSON to objects
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Hello<h1>");
});

//users
server.get("/users", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
//user by id
server.get("/users/:id", (req, res) => {
  users
    .get(req.params.id)
    .then(user => {
      if (user.length === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});
//posts
server.get("/posts", (req, res) => {
  posts
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});
//post by id
server.get("/posts/:id", (req, res) => {
  posts
    .get(req.params.id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

//tags
server.get("/tags", (req, res) => {
  tags
    .get()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

//tags by id
server.get("/tags/:id", (req, res) => {
  tags
    .get(req.params.id)
    .then(tag => {
      if (tag.length === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(tag);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.listen(8000, () => console.log("API running..."));
