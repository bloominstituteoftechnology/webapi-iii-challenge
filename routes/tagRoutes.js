const express = require("express");

const db = require("../data/helpers/tagDb");

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(tags => {
      res.json(tags);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
