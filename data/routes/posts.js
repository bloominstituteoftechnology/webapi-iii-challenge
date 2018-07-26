const express = require("express");
const router = express.Router();

const posts = require("../helpers/postDb");

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.get("/:id/tags", (req, res) => {
  posts
    .getPostTags(req.params.id)
    .then(tags => {
      if (tags.length === 0) {
        res
          .status(404)
          .json({ message: "The tags with the specified ID does not exist." });
      }
      res.status(200).json(tags);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The tags information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ errorMessage: "Please provide text for post." });
  }
  posts
    .update(id, { text })
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({
          errorMessage: "The post with the specified ID does not exist."
        });
      }
      res.status(200).json({ text });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

module.exports = router;
