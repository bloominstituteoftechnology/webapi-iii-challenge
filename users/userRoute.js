const express = require("express");
const db = require("../data/helpers/userDb");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users." });
    });
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  db.get(userId)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Failed to get post." });
      }
    })
    .catch(err => {
      res.status(404).json({ message: `User ${userId} does not exist.` });
    });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  const newUser = { name };

  db.insert(newUser)
    .then(userId => {
      const { id } = userId;
      db.get(id).then(user => {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(400).json({ message: "Missing name of user." });
        }
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create user." });
    });
});

module.exports = router;
