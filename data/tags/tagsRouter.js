// Node Modules
const express = require("express");

// Router level middleware
const router = express.Router();

const db = require("../helpers/tagDb");

// GET tags
router.get("/", (req, res) => {
  db
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error retrieving tags."
      });
    });
});


