const express = require("express");

const router = express.Router();

const db = require("../data/helpers/userDb.js");

router.get("/", (req, res) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  db
    .get(req.params.id)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// something here and less than 128ch.
router.post("/", (req, res) => {
  const { user } = req.body;
  if (!user) {
    res.status(400).json({ error: "Name Required" });
  } else if (user.length > 128) {
    res.status(400).json({ error: "Max length 128 characters" });
  } else {
    db
      .insert()
      .then(user => {
        res.json(user);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

module.exports = router;
