const express = require("express");
const db = require("../data/helpers/postDb");
const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "post get failed" });
    });
});



module.exports = router;