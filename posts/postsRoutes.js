const dbPost = require('../data/helpers/postDb.js');

const express = require('express');

const router = express.Router();

// CRUD operations

router.get('/', async (req, res) => {
    try {
        const posts = await dbPost.get();
        res.status(200).json(posts);
    } catch(err) {
        res.status(404).json({ message: err});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const posts = await dbPost.get();
        const foundPost = posts.find(post => {
            return post.id === id;
        });
        if (foundPost) {
            const post = await dbPost.get(id);
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'That post does not exist.'});
        }
        
    } catch(err) {
        res.status(404).json({ message: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const postData = req.body;
        const id = await dbPost.insert(postData);
        const posts = await dbPost.get()
        res.status(200).json({ newPostId: id, posts});
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCount = await dbPost.remove(id);
        const posts = await dbPost.get();
        res.status(200).json({deleteCount, posts});
    } catch(err) {
        res.status(500).json({ message: err })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        const updateCount = await dbPost.update(id, post);
        const posts = await dbPost.get();
        res.status(200).json({updateCount, posts});
    } catch(err) {
        res.status(500).json({message: err});
    }
});

module.exports = router;