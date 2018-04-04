const express = require("express");

const router = express.Router();

const db = require("../data/helpers/postDb.js");

router.get("/", (req, res) => {
  db.get().then(posts => {
    res.json(posts);
  });
});

router.get("/:postId/", (req, res) => {
  db.get(req.params.postId).then(post => {
    res.json(post);
  });
});

router.get("/:postId/tags", (req, res) => {
  db.getPostTags(req.params.postId).then(tags => {
    res.json(tags);
  });
});

router.post("/", (req, res) => {
  db.insert(req.body).then(postId => {
    const { id } = postId;
    db.get(id).then(post => {
      res.json(post);
    });
  });
});

router.delete("/:postId", (req, res) => {
  db.remove(req.params.postId).then(num => {
    if (num < 1) {
      res.status(404).json({ message: "There was no post with that id." });
    } else {
      res.json({ message: "Post successfully deleted." });
    }
  });
});

module.exports = router;
