const express = require("express");
const users = require("./data/helpers/userDb");
const router = express.Router();


function uppercase(req, res, next) {
  req.body.name = req.body.name.charAt().toUpperCase() + req.body.name.slice(1);
  next();
}

router.get("/", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  users
    .get(req.params.id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

router.get("/:userId/posts", (req, res) => {
  users
    .getUserPosts(req.params.userId)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The user post information could not be retrieved." });
    });
});

router.post("/", uppercase, (req, res) => {
  if (req.body.name.length < 128) {
    users
      .insert(req.body)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        console.log("error", err);
        res
          .status(500)
          .json({ error: "The user information could not be posted." });
      });
  } else {
    res.status(401).json({ error: "dats too long" });
  }
});

router.put("/:id", uppercase, (req, res) => {
  users
    .update(req.params.id, req.body)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error posting data" });
    });
});

router.delete("/:id", (req, res) => {
  users
    .remove(req.params.id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error deleting data" });
    });
});

module.exports = router;
