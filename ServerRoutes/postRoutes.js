const postDb = require('../data/helpers/postDb.js');
const express = require('express');

const router = express.Router();

//endpoint for GET posts
router.get('/', async (req, res, next) => {
    try {
        const response = await postDb.get();
        res.status(200).json(response);
    } catch (error) {
        next({ success: false, code: 500, message: 'Posts information could not be retrieved.', error: error.message})
    }
})

// endpoint for GET posts with id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await postDb.get(id);
        res.status(200).json(response);
    } catch (error) {
        next({ success: false, code: 500, message: 'Posts information could not be retrieved.', error: error.message})
    }
})

//endpoint for GET postTags
router.get('/:id/tags', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await postDb.getPostTags(id);
        res.status(200).json(response);
    } catch (error) {
        next({ success: false, code: 500, message: 'Posts information could not be retrieved.', error: error.message})
    }
})

//endpoint for POST post
router.post('/', async (req, res, next) => {
    if (!(req.body.text && req.body.userId)) {
        return next({ message: "Please provide userId and text for the post." })
    }

    try {
        const response = await postDb.insert(req.body);
        const newPost = await postDb.get(response.id);
        res.status(200).json(newPost);
    } catch (error) {
        next({ success: false, code: 500, message: "There was an error while saving post to the database", error: error.message})
    }
})

//endpoint for DELETE post
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const post = await postDb.get(id);
        await postDb.remove(id);
        res.status(200).json(post);
    } catch (error) {
        next({ success: false, code: 500, message: "The post could not be removed.", error: error.message})
    }
})

//endpoint for PUT post
router.put('/:id', async (req, res, next) => {
    if ((!req.body.text && !req.body.userId)) {
        return next({ message: "Please provide userId and text for the post." })
    }

    const id = req.params.id;
    const post = req.body;

    try {
        const response = await postDb.update(id, post);
        if (response===0) {
            next({ success: false, code: 404, message: "The post with the specified ID does not exist.", error: null})
        } else {
            const newPost = await postDb.get(id);
            res.status(200).json(newPost);
        }
    } catch (error) {
        next({ success: false, code: 500, message: "This post could not be modified.", error: error.message})
    }
})

module.exports = router;