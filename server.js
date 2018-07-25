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

//get users
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
//get user by id
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
//create user
server.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      errorMessage: "Please provide name for the post."
    });
  }
  users
    .insert({ name })
    .then(post => res.status(201).json({ name }))
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

//delete user
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users
    .remove(id)
    .then(users => {
      if (users === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json({ message: "user deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be deleted." });
    });
});

//get posts
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
//get post by id
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

//create post

server.post("/posts", (req, res) => {
  const { text, userId } = req.body;
  if (!text || !userId) {
    res.status(400).json({
      errorMessage: "Please provide post for the post."
    });
  }
  posts
    .insert({ text, userId })
    .then(post => res.status(201).json({ text, userId }))
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

//delete post

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts
    .remove(id)
    .then(posts => {
      if (posts === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json({ message: "post deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be deleted." });
    });
});

//get tags
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

//get tags by id
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

//create tags
server.post("/tags", (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).json({
      errorMessage: "Please provide tag for the post."
    });
  }
  tags
    .insert({ tag })
    .then(post => res.status(201).json({ tag }))
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

//delete tag

server.delete("/tags/:id", (req, res) => {
  const { id } = req.params;
  tags
    .remove(id)
    .then(tags => {
      if (tags === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json({ message: "post deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be deleted." });
    });
});

server.listen(8000, () => console.log("API running..."));
