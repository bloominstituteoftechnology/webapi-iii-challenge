const express = require("express");

const db = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(post => res.status(200).json(post))
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(foundID => {
      res.status(200).json(foundID);
    })
    .catch(error => {
      res.status(500).json({ error: "could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(numDeletedPosts => {
      res.status(200).json({ message: "post got deleted yo" });
    })
    .catch(error => {
      res.status(500).json({ error: "post couldn't delete" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  db.update(id, updates)
    .then(updated => {
      if (updated) {
        res
          .status(200)
          .json(updated)
          .end();
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  db.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = req.params.id;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "user not found" });
    });
}

module.exports = router;
