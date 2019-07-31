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

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
