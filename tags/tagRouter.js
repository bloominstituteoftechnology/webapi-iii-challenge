const express = require("express");

const router = express.Router();

const db = require("../data/helpers/tagDb.js");

router.get("/", (req, res) => {
  db.get().then(tags => {
    res.json(tags);
  });
});

module.exports = router;
