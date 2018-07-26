const express = require("express");
const router = express.Router();
const users = require("../helpers/userDb");

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  users
    .get(req.params.id)
    .then(user => {
      if (!user) {
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

router.get("/:id/posts", (req, res) => {
  users
    .getUserPosts(req.params.id)
    .then(posts => {
      if (posts.length === 0) {
        res
          .status(404)
          .json({ message: "The posts with the specified ID does not exist." });
      }
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: "Please provide name for post." });
  }
  users
    .update(id, { name })
    .then(user => {
      if (!user) {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      }
      res.status(200).json({ name });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

module.exports = router;
