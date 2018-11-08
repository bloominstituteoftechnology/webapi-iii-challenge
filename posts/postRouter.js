const express = require('express');
const router = express.Router();
const postDb = require("../data/helpers/postDb.js");

module.exports = router;
//Get all posts
router.get("/api/posts", (req, res) => {
    postDb
      .get()
      .then(post => {
        res.json(post);
      })
      .catch(err =>
        res.status(500).json({
          error: "The post information could not be retrieved."
        })
      );
  });
  
//Add a new post
router.post("/api/posts/", (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };
  if (!text || !userId) {
    return res.status(400).json({ error: "Please provide text to your post." });
  }
  postDb
    .insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error saving your post."
      });
    });
});

//Delete a post
router.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then(post => {
      if (post.length < 1) {
        res.status(404).json({
          message: "The post with that ID does not exist."
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The post could not be removed."
      })
    );
});

//Update a post
router.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;
  const newPost = { text, userId };
  if (!text || !userId) {
    return res
      .status(400)
      .json({ error: "Please provide a userId and text for the post." });
  }
  postDb
    .update(id, newPost)
    .then(post => {
      if (post.length < 1) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The post information could not be modified.."
      })
    );
});
