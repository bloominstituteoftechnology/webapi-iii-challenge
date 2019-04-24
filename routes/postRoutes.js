// Import Express
const express = require("express");

// Import Router
const router = express.Router();

// Import Post db
const db = require("../data/helpers/postDb.js");

// Endpoints

// Create
router.post("/", (req, res) => {
  const { text, user_id } = req.body;
  if (!text || !user_id) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a title and user id." });
  }
  db.insert({ text, user_id })
    .then(post => {
      res.status(201).json({ post });
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      });
    });
});

// Read
router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: "Post does not exists." });
      }
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "Post info could not be retrieved." });
    });
});

// Update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text, user_id } = req.body;
  if (!text || !user_id) {
    res
      .status(400)
      .json({ error: "Please provide text and user id for the post." });
  }
  db.update(id, { text, user_id })
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: "Post does not exists." });
      }
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "The post info could not be modified." });
    });
});

// Destroy

// Export Router
module.exports = router;
