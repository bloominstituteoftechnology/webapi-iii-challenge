// Import Express
const express = require("express");

// Import Router
const router = express.Router();

// Import User db
const db = require("../data/helpers/userDb.js");

// Endpoints

// Create
router.post("/", (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res
      .status(400)
      .json({ errorMessage: "Please provide id and name for the user." });
  }
  db.insert({ id, name })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database."
      });
    });
});

// Read
router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// Update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name for the user." });
  }
  db.update(id, name)
    .then(user => {
      if (user === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

// Delete

// Export Router
module.exports = router;
