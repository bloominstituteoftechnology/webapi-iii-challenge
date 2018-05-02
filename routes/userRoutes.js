const express = require("express");

const db = require("../data/helpers/userDb");

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
