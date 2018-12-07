const tagDb = require('../data/helpers/tagDb');
// const postDb = require("../data/helpers/postDb.js");
// const userDb = require("../data/helpers/userDb.js");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  tagDb
    .get()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve tags" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve tag" });
    });
});

module.exports = router;