const express = require("express");

const router = express.Router();

const db = require("../data/helpers/userDb");

// GET/Request User from Server
router.get("/", (req, res) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error getting users from the server." });
    });
});

// GET/Request Specific User
router.get("/:userId", (req, res) => {
  db
    .get(req.params.userId)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "There is no user with that ID." });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error getting the user from the server."
      });
    });
});

// GET/Request Specific Post from User
router.get("/:userId/posts", (req, res) => {
  db
    .getUserPosts(req.params.userId)
    .then(posts => {
      console.log(posts.length);
      if (posts.length >= 1) {
        res.json(posts);
      } else {
        res
          .status(404)
          .json({ message: "There are no posts with that user ID." });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error getting the user's posts from the server."
      });
    });
});

// POST/Create New User
router.post("/", (req, res) => {
  db
    .insert(req.body)
    .then(userId => {
      const { id } = userId;
      db.get(id).then(user => {
        res.json(user);
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error posting the user to the server."
      });
    });
});

// DELETE/Remove User
router.delete("/:userId", (req, res) => {
  db
    .remove(req.params.userId)
    .then(num => {
      if (num < 1) {
        res.status(404).json({ message: "There is no user with that ID." });
      } else {
        res.json({ message: `Successfully deleted user ${req.params.userId}` });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error deleting the user from the server."
      });
    });
});

// PUT/Update User
router.put("/:userId", (req, res) => {
  db
    .update(req.params.userId, req.body)
    .then(count => {
      if (count < 1) {
        res.status(404).json({ message: "There was no user with that ID" });
      } else {
        db.get(req.params.userId).then(user => {
          res.json(user);
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error updating the user on the server."
      });
    });
});

module.exports = router;