const express = require("express");

const router = express.Router({ mergeParams: true });

const db = require("../data/helpers/tagDb.js");

router.get("/", (req, res) => {
  db.get().then(tags => {
    res.json(tags);
  });
});

router.get("/:tagId", (req, res) => {
  db.get(req.params.tagId).then(tag => {
    res.json(tag);
  });
});

router.post("/", (req, res) => {
  let newTag = req.body;
  db.insert(newTag).then(tagId => {
    const { id } = tagId;
    db.get(id).then(tag => {
      res.json(tag);
    });
  });
});

module.exports = router;
