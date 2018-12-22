const express = require("express");
const postDb = require("../data/helpers/postDb");
const router = express.Router();

router.get("/", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts could not be retrieved." });
    });
});

module.exports = router;
