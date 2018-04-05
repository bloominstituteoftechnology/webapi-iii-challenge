// Implementing CRUD for users
const express = require("express");
const router = express.Router();
const userDb = require("../data/helpers/userDb.js");
// get(id), getUserPosts(userId)
// database functions all have insert(x), remove(id), and update(id, x)

// GET
router.get("/", (req, res) => {
  userDb
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(er => {
      res.status(500).json({ err: "Server error encountered.." });
    });
});

// GET by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .get(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "Server error encountered.." });
    });
});

// GET by userId
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  userDb
    .getUserPosts(userId)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        error: "Server error encountered while collecting user posts.."
      });
    });
});

// POST
router.post("/", (req, res) => {
  const user = req.body;

  userDb
    .insert(user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: "Server error encountered while attempting to add post.."
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Server error encountered while deleting post.." });
    });
});

// PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;

  userDb
    .update(id, user)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "Server error encountered while updating post.." });
    });
});

module.exports = router;
