const express = require("express");

const router = express.Router();

const db = require("../helpers/postDb.js");

router.get("/", function(req, res) {
  db
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", function(req, res) {
  const id = req.params.id;
  db
    .get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:postId/tags", function(req, res) {
  const postId = req.params.postId;
  db
    .getPostTags(postId)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", function(req, res) {
  const post = req.body;
  if (post.userId && Number.isInteger(post.userId) && post.text) {
    db
      .insert(post)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ error: "post must have a user id and text." });
  }
});

router.put("/:id", function(req, res) {
  const post = req.body;
  const id = req.params.id;

  db
    .update(id, post)
    .then(response => {
      if (response > 0) res.status(200).json({ message: "Post updated" });
      else res.status(404).json({ error: "Post with such id does not exist" });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", function(req, res) {
  const id = req.params.id;

  db
    .remove(id)
    .then(response => {
      if (response > 0) res.status(204).json(response);
      else res.status(400).json({ error: "Such post does not exist" });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
