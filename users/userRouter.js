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

router.delete("/:userId", (req, res) => {
  db.remove(req.params.userId).then(num => {
    if (num < 1) {
      res.status(404).json({ message: "There is no user with that ID." });
    } else {
      res.json({ message: `Successfully deleted user ${req.params.userId}` });
    }
  });
});

router.put("/:userId", (req, res) => {
  db.update(req.params.userId, req.body).then(count => {
    if (count < 1) {
      res.status(404).json({ message: "There was no user with that ID" });
    } else {
      db.get(req.params.userId).then(user => {
        res.json(user);
      });
    }
  });
});

module.exports = router;
