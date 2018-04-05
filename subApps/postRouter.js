// Implementing CRUD for posts
const express = require("express");
const router = express.Router();
const postDb = require("../data/helpers/postDb.js");
// getPostTags(postId)
// database functions all have insert(x), remove(id), and update(id, x)

// GET by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  postDb
    .get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        err: "Server error encountered while retrieving post by id.."
      });
    });
});

// POST
router.post("/", (req, res) => {
  const post = req.body;

  postDb
    .insert(post)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: "Server error encountered while attempting to add post.."
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  postDb
    .remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Server error encountered while deleting post.." });
    });
});

// PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;

  postDb
    .update(id, post)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "Server error encountered while updating post.." });
    });
});

module.exports = router;
