const express = require('express');
const postDb = require('./postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error getting posts.' });
  }
});

router.get('/:id', validatePostId, async (req, res) => {
  try {
    const posts = await postDb.getById(req.post.id);
    res.status(200).json({ posts });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: 'Error getting requested post.' });
  }
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {
    const posts = await postDb.remove(req.post.id);
    res.status(204).json({ posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting post' });
  }
});

router.put('/:id', (req, res) => {});

// custom middleware

async function validatePostId(req, res, next) {
  const { id } = req.params;
  try {
    const postId = await postDb.getById(id);
    if (postId) {
      req.post = postId;
      next();
    } else {
      res.status(404).json({ message: 'That post does not exist.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error' });
  }
}

module.exports = router;
