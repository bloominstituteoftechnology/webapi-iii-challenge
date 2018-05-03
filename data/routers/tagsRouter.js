const express = require("express");

const router = express.Router();

const db = require("../helpers/tagDb.js");

const upperTags = function(req, res, next) {
  req.body.tag = req.body.tag.toUpperCase();
  next();
};

const getUpperTags = function(req, res, next) {
  req.on("end", function() {
    res.data.map(tag => tag.toUpperCase());
  });
  next();
};

router.get("/", getUpperTags, function(req, res) {
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

router.post("/", upperTags, function(req, res) {
  // let tag = req.body;
  if (req.body.tag && req.body.tag.length <= 80) {
    db
      .insert(req.body)
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
