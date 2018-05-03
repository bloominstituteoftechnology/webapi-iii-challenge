// Node Modules
const express = require("express");

// Router level middleware
const router = express.Router();

const db = require("../helpers/userDb");

// GET all users; root
router.get("/", (res, req) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while retrieving users."
      });
    });
});

// GET user from id
router.get("/:id", (req, res) => {
  db
    .get(id)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while retrieving the specified user."
      });
    });
});

// INSERT user to db
router.post("/", (req, res) => {
  const user = req.body;
  db
    .insert(user)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while adding a new user."
      });
    });
});
