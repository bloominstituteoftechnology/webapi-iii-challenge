const express = require("express");
const userDb = require("../data/helpers/userDb");
const router = express.Router();

router.get("/", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

router.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user does not exist" });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: "The user information could not be retrieved." });
    });
});

module.exports = router;
