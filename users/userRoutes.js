const express = require("express");
const dbUsers = require("../data/helpers/userDb");
const router = express.Router();


function uppercase(req, res, next) {
    req.body.name = req.body.name.charAt().toUpperCase() + req.body.name.slice(1);
    next();
  };


router.get("/", (req, res) => {
  dbUsers.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The user information could not be retreieved" });
    });
});

router.get("/:id", (req, res) => {
  dbUsers.get(req.params.id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved" });
    });
});

router.post("/", uppercase, (req, res) => {
  if (req.body.name.length < 128) {
    dbUsers.insert(req.body)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log("error", err);
        res
          .status(500)
          .json({ error: "The user information could not be posted" });
      });
  } else {
    res.status(401).json({ error: "Must be under 128 characters." });
  }
});

router.put("/:id", uppercase, (req, res) => {
  dbUsers.update(req.params.id, req.body)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "The user cannot be updated." });
    });
});

router.delete("/:id", (req, res) => {
  dbUsers.remove(req.params.id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "The user cannot be deleted." });
    });
});


module.exports = router;