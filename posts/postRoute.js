const express = require("express");
const db = require("../data/helpers/postDb");

const router = express.Router();

// Endpoints
router.get("/", (req, res) => {
  db.get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get posts." });
    });
});

router.get("/:postId", (req, res) => {
  const { postId } = req.params;
  console.log(req.params);
  db.get(postId)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "Failed to get post." });
      }
    })
    .catch(err => {
      res.status(404).json({ message: `Post ${postId} does not exist.` });
    });
});

router.post("/", (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };

  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.get(id).then(post => {
        if (post) {
          res.status(201).json(post);
        } else {
          res.status(400).json({ message: "Missing text or author." });
        }
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create post." });
    });
});

router.delete("/:postId", (req, res) => {
  const { postId } = req.params;
  db.remove(postId)
    .then(deleted => {
      if (postId) {
        res.json(deleted);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(409).json({ message: `Problem deleting post ${postId}.` });
    });
});

router.put("/:postId", (req, res) => {
  const { postId } = req.params;
  const { text, userId } = req.body;
  const newPost = { text, userId };

  console.log(postId);
  console.log(newPost);

  if (newPost) {
    db.update(postId, newPost)
      .then(post => {
        if (postId) {
          res.json({ message: "Sucessfully updated." });
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The post information could not be modified." });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide the text and user ID for the post." });
  }
});

module.exports = router;
