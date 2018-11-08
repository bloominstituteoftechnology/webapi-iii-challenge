const express = require('express');

const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json(error);
    }
})


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postDb.get(id)
        
        res.status(200).json(post);
    } catch(error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        const postId = await postDb.insert(body)
        res.status(201).json(postId);
    } catch(error) {
        error.errno === 19 ?
            res.status(406).json('post already exists')
            :res.status(500).json(error);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const count = await postDb.remove(id);
        
        count
            ? res.status(200).json({message: `${count} post's deleted`})
            : res.status(404).json({message: 'post not found'})
    } catch(error) {
        res.status.apply(500).json(error);
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const count = await postDb.update(id, req.body);

        count
            ? res.status(200).json({message: `${count} post's edited`})
            : res.status(404).json({message: 'post not found'})

    } catch(error) {
        res.status.apply(500).json(error);
    }
})

module.exports = router;