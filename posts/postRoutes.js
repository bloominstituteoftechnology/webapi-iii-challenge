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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "post does not exist" });
      }
    })
    .catch(err => {
      res.status(404).json({ error: "The post could not be retrieved" });
    });
});

module.exports = router;
