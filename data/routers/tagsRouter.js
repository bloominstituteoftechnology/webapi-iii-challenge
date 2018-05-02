const express = require("express");

const router = express.Router();

const db = require("../helpers/tagDb.js");

router.get("/", function(req, res) {
  db
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", function(req, res) {
  const id = req.params.id;
  db
    .get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", function(req, res) {
  const tag = req.body;
  if (tag.tag && tag.tag.length <= 80) {
    db
      .insert(tag)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ error: "tag must have no more than 80 characters" });
  }
});

router.put("/:id", function(req, res) {
  const tag = req.body;
  const id = req.params.id;

  db
    .update(id, tag)
    .then(response => {
      if (response > 0) res.status(200).json({ message: "Tag updated" });
      else res.status(404).json({ error: "Tag with such id does not exist" });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", function(req, res) {
  const id = req.params.id;

  db
    .remove(id)
    .then(response => {
      if (response > 0) res.status(204).json(response);
      else res.status(400).json({ error: "Such tag does not exist" });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
