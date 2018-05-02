const express = require('express');

const db = require('../data/helpers/userDB')

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// router GET, find by ID first, then return "post"
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db
    .getUserPosts(id)
    .then(user => {
      if (user.length === 0) {
        res.status(404).json({ message: "Post not found. Try again." });
      } else {
        res.json(user[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// router POST, Insert post, then give response, which is id of the post
router.post("/api/users", (req, res) => {
  const post = req.body;

  db
    .insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: "Error; could not save post to database" });
    });
});


module.exports = router;
