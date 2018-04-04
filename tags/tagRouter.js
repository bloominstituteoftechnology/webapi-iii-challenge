const express = require("express");

const router = express.Router({ mergeParams: true });

const db = require("../data/helpers/tagDb.js");

router.get("/", (req, res) => {
  db.get().then(tags => {
    res.json(tags);
  });
});

module.exports = router;
