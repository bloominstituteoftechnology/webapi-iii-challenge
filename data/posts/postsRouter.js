// Node Modules
const express = require("express");

// Router level middleware
const router = express.Router();

const db = require("../helpers/postDb");

// GET posts; root
router.get("/", (req, res) => {
  db
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error retrieving posts."
      });
    });
});
