const express = require("express");
const posts = require("../helpers/postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  posts
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

router.post("/", (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a userID and text for the post." });
  }
  posts
    .insert({ userId, text })
    .then(post => res.status(201).json(post))
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error saving the user to the database." })
    );
});

router.get("/:id", (req, res) => {
  posts
    .get(req.params.id)
    .then(post => {
      if (post.length !== 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  posts
    .get(req.params.id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(response);
      posts
        .remove(req.params.id)
        .then(count => {
          if (count === 0) {
            return res.status(404).json({
              message: "The user with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          res.status(500).json({ error: "The post could not be removed." });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: "The user with the specified ID does not exist." });
    });
});

router.put("/:id", (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text) {
    res.status(400).json({
      errorMessage: "Please provide a userId and text for the post."
    });
  }
  posts
    .get(req.params.id)
    .then(response => {
      if (response.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        posts
          .update(req.params.id, { userId, text })
          .then(count => {
            console.log(count);
            posts
              .get(req.params.id)
              .then(post => {
                res.status(200).json(post);
              })
              .catch(err => {
                res.status(500).json({
                  error: "The post information could not be retrieved."
                });
              });
          })

          .catch(err => {
            res.status(500).json({ error: err.message });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id/tags", (req, res) => {
  posts
    .getPostTags(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(() =>
      res.status(404).json({ error: "The specified Post ID does not exist." })
    );
});

module.exports = router;
