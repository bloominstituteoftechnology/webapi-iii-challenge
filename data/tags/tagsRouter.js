// Node Modules
const express = require("express");

// Router level middleware
const router = express.Router();

const db = require("../helpers/tagDb");

// GET tags; root
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

// GET tags by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch(error => ({
      error: "There was an error retrieving the specified tag."
    }));
});
