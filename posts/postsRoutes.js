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
        const { id } = req.params;
        const post = await dbPost.get(id);
        res.status(200).json(post);
        // refactor this to check validity of id
        // if (post.text === '') {
        // } else {
        //     res.status(404).json({ message: `Post ${id} has not been created yet.`});
        // }
    } catch(err) {
        res.status(404).json({ message: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const postData = req.body;
        const id = await dbPost.insert(postData);
        const posts = await dbPost.get()
        res.status(200).json({id, posts});
    } catch(err) {
        res.status(404).json({ message: err });
    }
});

module.exports = router;