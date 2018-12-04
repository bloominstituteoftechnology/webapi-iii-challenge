const express = require("express");
const db = require("../data/helpers/postDb");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get posts." });
    });
});

module.exports = router;
