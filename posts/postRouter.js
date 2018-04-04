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

module.exports = router;
