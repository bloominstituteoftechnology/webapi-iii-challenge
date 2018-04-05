const express = require("express");

const router = express.Router();

const db = require("../data/helpers/postDb.js");

router.get("/", (req, res) => {
  db
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was a problem getting data from the server." });
    });
});

router.get("/:postId/", (req, res) => {
  db
    .get(req.params.postId)
    .then(post => {
      console.log(post);
      if (post.length >= 1) {
        res.json(post);
      } else {
        res.status(404).json({ message: "There is no post with that ID." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was a problem getting data from the server." });
    });
});

router.get("/:postId/tags", (req, res) => {
  db
    .getPostTags(req.params.postId)
    .then(tags => {
      if (tags.length > 0) {
        res.json(tags);
      } else {
        res.status(404).json({ message: "There is no post with that ID." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was a problem getting data from the server." });
    });
});

router.post("/", (req, res) => {
  db
    .insert(req.body)
    .then(postId => {
      const { id } = postId;
      db.get(id).then(post => {
        res.json(post);
      });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was a problem posting to the server." });
    });
});

router.delete("/:postId", (req, res) => {
  db
    .remove(req.params.postId)
    .then(num => {
      if (num < 1) {
        res.status(404).json({ message: "There was no post with that id." });
      } else {
        res.json({ message: "Post successfully deleted." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was a problem deleting the post. " });
    });
});

router.put("/:postId", (req, res) => {
  db
    .update(req.params.postId, req.body)
    .then(count => {
      if (count < 1) {
        res.status(404).json({ message: "There was no post with that ID. " });
      } else {
        db.get(req.params.postId).then(post => {
          res.json(post);
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error updating the post." });
    });
});

module.exports = router;
