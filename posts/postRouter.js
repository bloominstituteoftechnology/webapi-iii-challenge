const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({ message: 'Error retrieving posts.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const individualPost = await Posts.getById(req.params.id);
        res.status(200).json(individualPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Post not found.' });
    }
});

router.delete('/:id', validatePostId, async (req, res) => {
    try {
        res.status(200).json(await Posts.remove(req.params.id));
    } catch (error) {
        res.status(500).json({ message: 'Error removing post.' });
    }
});

router.put('/:id', validatePostId, async (req, res) => {
    try {
        res.status(200).json(await Posts.update(req.params.id, req.body));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating user.' });
    }
});

// custom middleware

function validatePostId(req, res, next) {
    if(!req.params.id) {
        res.status(400).json({ message: 'Invalid User ID' });
      } else {
          req.post = `${req.params.id}`;
      }
      next();
};

module.exports = router;