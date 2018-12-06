const express = require("express");
const posts = require("../data/helpers/postDb.js");
const router = express.Router();

// POST ROUTES BELLOW
router.get("/", (req, res) => {
  posts
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "Can not retrieve posts" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  posts
    .get(id)
    .then(posts => {
      posts
        ? res.json(posts)
        : res
            .status(404)
            .json({ error: "The post with the specified ID does not exist" });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "This post information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const post = req.body;

  if (post.text && post.userId) {
    posts
      .insert(post)
      .then(resp => {
        posts.get(resp.id).then(post => {
          res.status(201).json(post);
        });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: "There was an error when saving the post to the database"
          });
      });
  } else {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  posts
    .remove(id)
    .then(count => {
      count
        ? res.status(200).json({ message: "Post has been deleted" })
        : res.status(404).json({ message: "Invalid Id" });
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to delete the post" });
    });
});
router.put("/:id", (req, res) => {
  const post = req.body;
  const { id } = req.params;
  if (post.text && post.userId) {
    posts
      .insert(post)
      .then(count => {
        count
          ? posts.get(id).then(post => {
              res.status(201).json(post);
            })
          : res
              .status(404)
              .json({ error: "The post doesn't exist with that id" });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: "There was an error when saving the post to the database"
          });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide userID and text for the post." });
  }
});

module.exports = router;
