const express = 'express';
const dbPosts = require("../data/helpers/postDb.js");

const router = express.Router();

router.get('/', (req, res) => {
  dbPosts
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ error: "The post information could be retrieved." });
    })
});

router.get('/:id', (req, res) => {
  dbPosts
    .getById(req.params.id)
    .then((post) => {
      if (post.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist"});
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The post information could not be retrieved." });
    })
});

router.post('/', (req, res) => {
  const newPost = req.body;
  if (!newPost.hasOwnProperty("title") || !newPost.hasOwnProperty("contents")) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post"});
  }
  dbPosts
    .insert(newPost)
    .then((idOfNewPost) => {
      res.status(201).json(idOfNewPost);
    })
    .catch((err) => {
      res.status(500).json({ error: "There was an error while saving the post to the database"});
  });
});

router.delete('/:id', (req, res) => {
  dbPosts
    .remove(req.params.id)
    .then((numOfPostDeleted) => {
      if (!numOfPostDeleted) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(204).end();
      }
    })
    .catch((err) => {
      res.status(500),json({ error: "The post could not be removed" });
    })
});

router.put('/:id', (req, res) => {
  const postToUpdate = req.body;
  if (!postToUpdate.hasOwnProperty("title") || !postToUpdate.hasOwnProperty("contents")) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  }
  dbPosts
    .update(req.params.id, postToUpdate)
    .then((numOfUpdatedPosts) => {
      if (!numOfUpdatedPosts) {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      } else {
        dbPosts.getById(req.params.id).then((updatedPost) => {
          res.status(200),json(updatedPost);
        })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The post information could not be modified." })
    })
});

module.exports = router;