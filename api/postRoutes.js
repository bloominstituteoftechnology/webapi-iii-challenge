const express = require('express')
const router = express.Router();
const posts = require('../data/helpers/postDb');

router.get('/', async (req, res) => {
  try {
    const allPosts = await posts.get();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: "Posts could not be retrieved.", error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await posts.get(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Post could not be retrieved.", error: error.message });
  }
});

router.get('/:id/tags', async (req, res) => {
  try {
    const tags = await posts.getPostTags(req.params.id);
    if (tags.length === 0) {
      res.status(404).json({ message: "Post has no tags or does not exist." });
      return;
    }
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Post tags could not be retrieved.", error: error.message });
  }
});

router.post('/', async (req, res) => {
  if (!req.body.text || !req.body.userId) {
    res.status(400).json({ message: "Please enter some text and/or a user ID." });
  }
  try {
    const { id } = await posts.insert(req.body);
    try {
      const newPost = await posts.get(id);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(404).json({ message: "Post does not exist." });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the post to the database.", error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  if (!req.body.text || !req.body.userId) {
    res.status(400).json({ message: "Please enter some text and/or a user ID." });
  }
  try {
    await posts.update(req.params.id, req.body);
    try {
      const post = await posts.get(req.params.id);
      if (post === undefined) {
        res.status(404).json({ message: "Post does not exist." });
        return;
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Post could not be retrieved.", error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while saving the edited post to the database.", error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await posts.remove(req.params.id);
    if (post === 0) {
      res.status(404).json({ message: "Post does not exist." });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the post from the database.", error: error.message });
  }
});

module.exports = router;
