const express = require("express");

const router = express.Router();

const db = require("../data/helpers/userDb");

router.get("/", (req, res) => {
  db.get().then(users => {
    res.json(users);
  });
});

router.get("/:userId", (req, res) => {
  db.get(req.params.userId).then(user => {
    res.json(user);
  });
});

router.get("/:userId/posts", (req, res) => {
  db.getUserPosts(req.params.userId).then(posts => {
    res.json(posts);
  });
});

router.post("/", (req, res) => {
  db.insert(req.body).then(userId => {
    const { id } = userId;
    db.get(id).then(user => {
      res.json(user);
    });
  });
});

module.exports = router;
