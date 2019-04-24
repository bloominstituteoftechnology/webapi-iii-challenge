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
  res.send("hello 2");
});

// Update

// Destroy

// Export Router
module.exports = router;
