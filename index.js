// Pull in my dependencies
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const port = 8000;
const helmet = require("helmet");
const knex = require("knex");
const sqlite3 = require("sqlite3");
const userDb = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");

// Instantiate my server
const server = express();

server.use(express.json());

// server.use(function (req, res, next) {
//   console.log('Time:', Date.now())
//   next()
// })

// MIDDLEWARES

const yell = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};
// server.use(yell);

// CRUD operations & endpoints

server.get("/", (req, res) => {
  res.send("<h1>Go to /users</h1>");
});

server.get("/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: "No Users Coming :(" }));
});

server.get("/posts", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => res.status(500).json({ error: "Can't retrieve posts..." }));
});

server.get("/users/:id", (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => res.status(500).send({ error: "You messed up" }));
});

server.post("/users", yell, (req, res) => {
  const { name } = req.body;
  const newUser = { name };
  if (!name) {
    return res.status(400).json({ error: "Please provide a name." });
  }
  userDb
    .insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error =>
      res
        .status(500)
        .json({ error: "An error has occurred while saving this post" })
    );
});

server.post("/posts", (req, res) => {
  const { userId, text } = req.body;
  const newPost = { userId, text };
  postDb
    .insert(newPost)
    .then(post => {
      if (!post) {
        return res
          .status(422)
          .send({ Error: "Cannot save unless post has valid content" });
      }
      // const { id } = postId;
      res.status(201).json(newPost);
    })
    .catch(error =>
      res.status(500).json({
        error: "an error occurred while saving the post to the database"
      })
    );
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(deleteUser => {
      if (deleteUser) {
        res.status(200).json({ message: "Deleted Successfully!" });
      } else {
        res
          .status(404)
          .json({ error: `The user with specified Id: ${id}, does not exist` });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Cannot remove user" });
    });
});

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(deletePost => {
      if (deletePost) {
        res.status(200).json({ message: "Deleted Successfully!" });
      } else {
        res
          .status(404)
          .json({ error: `The post with specified Id: ${id}, does not exist` });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Cannot remove post" });
    });
});

server.put("/users/:id", yell, (req, res) => {
  const { id } = req.params.id;
  const { name } = req.body;
  const updatedUser = { id, name };
  userDb
    .update(id, updatedUser)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ error: `The user with id: ${id}, does not exist.` });
      }
    })
    .catch(error => {
      res.json({ error: "Cannot change user" });
    });
});

server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;
  const updatedPost = { userId, text };
  userDb
    .update(id, updatedPost)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ error: `The post with id: ${id}, does not exist.` });
      }
    })
    .catch(error => {
      res.json({ error: "Cannot change post" });
    });
});

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));
