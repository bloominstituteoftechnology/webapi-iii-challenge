const express = require('express');
const postDb = require('./postDb');

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text) {
        res.status(400).json({errorMessage: 'Please provide a userId and text for this post.'});
    } else {
        try {
            const response = await postDb.insert({userId, text});
            res.status(201).json(response);
        } catch (ex) {
            next(ex);
            // res.status(500).json({errorMessage: 'There was an error while saving the post info.'});
        }
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await postDb.get();
        res.status(200).json(response);
    } catch (ex) {
        next(ex);
        // res.status(500).json({errorMessage: 'There was an error retrieving the posts from the database.'});
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const response = await postDb.get(id);
        res.status(200).json(response);
    } catch (ex) {
        next(ex);
        // res.status(500).json({errorMessage: 'There was an error retrieving the specified post from the database.'});
    }
})

router.get('/:id/tags', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await postDb.getPostTags(id);
        res.status(200).json(response);
    } catch (ex) {
        next(ex);
        // res.status(500).json({errosMessage: 'There was an error retrieving the post tags.'});
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { userId, text } = req.body;
    if (!userId || !text) {
        res.status(400).json({errorMessage: 'Please provide a userId and new text for this post.'});
    } else {
        try {
            const response = await postDb.update(id, {userId, text});
            if (response === 1) {
                res.status(201).json(response);
            } else {
                res.json(404).json({errorMessage: 'The post with the specified ID does not exist.'});
            }
        } catch (ex) {
            next(ex);
            // res.status(500).json({errorMessage: 'There was an error updating the post.'});
        }
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await postDb.remove(id);
        res.status(204).end();
    } catch (ex) {
        next(ex);
        // res.status(500).json({errorMessage: 'There was an error deleting the post from the database.'});
    }
})

module.exports = router;