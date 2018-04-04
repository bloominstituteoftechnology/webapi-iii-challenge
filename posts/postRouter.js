const express = require("express");

const router = express.Router();

const db = require("../data/helpers/postDb.js");

router.get("/", (req, res) => {
  db.get().then(posts => {
    res.json(posts);
  });
});

module.exports = router;
