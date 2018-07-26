const express = require('express');

const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/posts', async (req, res) => { // GET post
    try {
        const users = await postDb.get();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ error: 'The posts information could not be retrieved.' })
    };
});

router.post('/posts', async (req, res) => { // POST post
    const { userId, text } = req.body;
    if (!(userId || text))
        res.status(400).json({ message: 'Please provide userId and text.' })
    try {
        const { postId } = await postDb.insert({ userId, text });
        try {
            const post = await postDb.get(postId.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: 'Could not create post.', res })
        }
    }   catch (error) {
        res.status(404).json({ Error: 'Unable to retrieve post.', res })
    }
});

module.exports = router;