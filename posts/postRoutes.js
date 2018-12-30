const express = require("express");
const postDb = require("../data/helpers/postDb");
const router = express.Router();

router.get("/", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "post does not exist" });
      }
    })
    .catch(err => {
      res.status(404).json({ error: "The post could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const post = req.body;
  if (post.text && post.userId) {
    postDb
      .insert(post)
      .then(idInfo => {
        postDb.get(idInfo.id).then(post => {
          res.status(201).json(post);
        });
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving post to the database"
        });
      });
  } else {
    res.status(400).json({ errorMessage: "Please provide text and userId for post" });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  postDb.remove(id)
    .then(count => {
      if (count) {
        res.json({ message: 'Post successfully deleted'})
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist'})
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed'})
    })
})

module.exports = router;
