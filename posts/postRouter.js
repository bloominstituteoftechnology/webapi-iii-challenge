const express = require("express");

const router = express.Router();

const db = require("../data/helpers/postDb.js");

router.get("/", (req, res) => {
  db.get().then(posts => {
    res.json(posts);
  });
});

router.get("/:userId/", (req, res) => {
  db.get().then(posts => {
    let returnPosts = posts.filter(post => post.userId == req.params.userId);
    res.json(returnPosts);
  });
});

module.exports = router;
