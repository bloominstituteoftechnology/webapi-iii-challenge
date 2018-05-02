const express = require("express");

const router = express.Router();

const db = require("../helpers/userDb.js");

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
      if (response) res.status(200).json(response);
      else res.status(400).json({ error: "User does not exist" });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", function(req, res) {
  const user = req.body;

  if (user.name && user.name.length <= 128) {
    db
      .insert(user)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res
      .status(400)
      .json({ error: "Provide a name that does not exceed 128 characters " });
  }
});

router.put("/:id", function(req, res) {
  const user = req.body;
  const id = req.params.id;

  db
    .update(id, user)
    .then(response => {
      if (response > 0) res.status(200).json(id);
      else res.status(400).json({ error: "Such user does not exist" });
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
      else res.status(400).json({ error: "Such user does not exist" });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
