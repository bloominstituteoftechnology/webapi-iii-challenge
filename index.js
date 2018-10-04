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
const postDb = require("./data/helpers/postDb");

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

//Get user posts
server.get("/users/:id/posts", (req, res) => {
  const { id } = req.params;
  console.log(id);
  userDb
    .getUserPosts(id)
    .then(userPosts => {
      res.json(userPosts);
    })
    .catch(err => console.error(err));
});

// ---------------Posts---------------

// Get posts
server.get("/posts", (req, res) => {
  postDb
    .get()
    .then(userPost => {
      res.json(userPost);
    })
    .catch(err => console.error(err));
});

// Get post
server.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(userPost => {
      res.json(userPost);
    })
    .catch(err => console.error(err));
});

// Post post (lol)
server.post("/posts", (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };
  postDb
    .insert(newPost)
    .then(post => {
      res.json(post);
    })
    .catch(err => console.error(err));
});

// Delete post
server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => console.error(err));
});

// Put Post
server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const newPost = { text };
  postDb
    .update(id, newPost)
    .then(post => {
      res.json(post);
    })
    .catch(err => console.error(err));
});

// Call server
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
