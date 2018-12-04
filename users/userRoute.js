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

module.exports = router;
