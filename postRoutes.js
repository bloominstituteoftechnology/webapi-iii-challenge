const express = require('express');
const postDb = require('./data/helpers/postDb')
const router = express.Router()

router.get("/", (req, res) => {
    postDb
      .get()
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        console.error("error", err);
        res.status(500).json({ error: "There was an error accessing the posts" });
      });
  });
  
  router.get("/:id", (req, res) => {
    id = req.params.id;
    postDb
      .get(id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        console.error("error", err);
        res.status(500).json({ error: "Can't gather post" });
      });
  });
  
  router.post("/", (req, res) => {
    const postContents = req.body;
    postDb
      .insert(postContents)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        console.error("error", err);
        res.status(500).json({ error: "Something went wrong with your post" });
      });
  });
  
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const postContents = req.body;
    postDb
      .update(id, postContents)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        console.error("error", err);
        res.status(500).json({ message: "Unable to UPDATE post" });
      });
  });
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    postDb
      .remove(id)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        console.error("error", err);
        res.status(500).json({
          message: "There was an error when trying to delete this post"
        });
      });
  });

  module.exports = router