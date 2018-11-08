const express = require('express');
const dbPost = require('../data/helpers/postDb.js');

const router = express.Router();

//entry '/api/posts'
router.get('/', async (req, res) => {
    try {
        const posts = await dbPost.get()
        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ error: "The posts could not be retrieved." })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = await req.params.id;
        const post = await dbPost.get(id);
        res.json({ post })
    } catch (error) {
        res.status(500).json({ error: "The posts could not be retrieved." })
    }
})

router.post('/', async (req, res) => {
    const posting = req.body;
    try {
        const newpost = await dbPost.insert(posting);
        const post = await dbPost.get(newpost.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "We were unable to add your post." })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const postId = await dbPost.remove(id);
        if (postId === 0) {
            res.status(404).json({ error: `There is not a post with the id of ${id}` });
        } else {
            res.status(200).json({ message: 'The post has been deleted.' });
        }
    } catch (error) {
        res.status(500).json({ error: "something is a miss." })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const changes = await req.body;
    const count = await dbPost.update(id, changes);
    if (!changes.userId || !changes.text) {
        res.status(404).json({ error: "Please be sure to include a userId and text input." })
    } else {
        try {
            if (count === 0) {
                res.status(404).json({ error: `There is no post with the id of ${id}` })
            } else {
                const updated = await dbPost.get(id);
                res.status(200).json({ updated })
            }
            console.log(count)
        } catch (error) {
            res.status(500).json({ error: "We were unablet to update your post." })
        }
    }
})

module.exports = router;