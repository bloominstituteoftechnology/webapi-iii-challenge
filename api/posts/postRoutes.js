const express = require('express');
const router = express.Router();
const postDb = require('../../data/helpers/postDb');

// Middleware
router.use(express.json());

// POST ROUTES

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Can't get the posts" });
  }
});

// GET post by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postDb.get(id);
    if (!post) {
      res.status(404).json({ message: 'Post does not exist.' });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// POST add a new post
router.post('/', async (req, res) => {
  const postData = req.body;
  if (!postData.text || !postData.userId) {
    res.status(404).json({ message: 'That post does not exist' });
  } else {
    try {
      const newPostId = await postDb.insert(postData);
      const newPost = await postDb.get(newPostId.id);
      res.status(201).json(newPost);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'There was an error creating a new post.' });
    }
  }
});

// PUT update a post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPostData = req.body;
  if (!updatedPostData.text || !updatedPostData.userId) {
    res.status(404).json({ message: 'There is nothing to update!' });
  } else {
    try {
      const count = await postDb.update(id, updatedPostData);
      if (!count) {
        res.status(500).json({ message: 'Nothing was updated' });
      } else {
        const updatedPost = await postDb.get(id);
        res.status(200).json(updatedPost);
      }
    } catch (error) {
      res.status(500).json({ error: 'There was an error updating this post.' });
    }
  }
});

// DELETE the current post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const count = await postDb.remove(id);
    if (!count) {
      res.status(400).json({ message: 'Nothing was deleted!' });
    } else {
      res.status(200).json({ message: 'Post was successfully deleted!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong deleting the post.' });
  }
});

module.exports = router;
