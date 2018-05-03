// Node Modules
const express = require("express");

// Router level middleware
const router = express.Router();

const db = require("../helpers/userDb");

// GET all users; root
router.get("/", (res, req) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while retrieving users."
      });
    });
});

// GET user from id
router.get("/:id", (req, res) => {
  db
    .get(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while retrieving the specified user."
      });
    });
});

// GET user posts by id
router.get("/:id/posts", (req, res) => {
  const { id } = req.params;

  db
    .getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while retrieving the specified user's posts."
      });
    });
});

// INSERT user to db
router.post("/", (req, res) => {
  const user = req.body;

  db
    .insert(user)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while adding a new user."
      });
    });
});

// UPDATE user
router.put("/", (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.get(id).then(updatedUser => {
          res.status(200).json(updatedUser);
        });
      } else {
        res.status(404).json({ error: "Could not find specified user." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while adding a new user."
      });
    });
});

// REMOVE user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let post;

  db.get(id).then(response => {
    post = { ...response };

    db
      .remove(id)
      .then(response => {
        res.status(200).json(post);
      })
      .catch(error => {
        res.status(404).json({
          error: "Could not find specified user."
        });
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while removing a new user."
        });
      });
  });
});

module.exports = router;