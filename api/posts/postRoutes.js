const express = require('express');
const posts = require('../../data/helpers/postDb');
const errorHandler = require('../errorHandler');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { userId, text } = req.body;
    if (!userId || !text) next({ code: 400, errorMessage: "Please provide userId and text for the post." });
    try {
        const findResponse = await users.get();
        for (let i = 0; i < findResponse.length; i++) {
            if (findResponse[i].id == userId) {
                try {
                    const response = await posts.insert({ userId, text });
                    return res.status(201).json(response);
                } catch (err) {
                    next({ code: 500, error: 'There was an error while saving the post to the database.' });
                }
            }
        }
        next({ code: 400, errorMessage: 'Please provide a userId that matches an existing users id.' });
    } catch (err) {
        next({ code: 500, error: 'The posts information could not be retrieved.' });
    }
})

router.get('/', async (req, res, next) => {
    try {
        const response = await posts.get();
        return res.status(200).json(response);
    } catch (err) {
        next({ code: 500, error: 'The posts information could not be retrieved.' });
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const response = await posts.get(req.params.id);
        return res.status(200).json(response);
    } catch (err) {
        next({ code: 500, error: 'The post information could not be retrieved.' });
    }
})

router.get('/tags/:id', async (req, res, next) => {
    try {
        const response = await posts.getPostTags(req.params.id);
        if (response.length === 0) next({ code: 404, message: 'This post has no tags!' });
        return res.status(200).json(response);
    } catch (err) {
        next({ code: 500, error: 'The post information could not be retrieved.' });
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { userId, text } = req.body;
    if (!userId || !text) next({ code: 400, errorMessage: "Please provide userId and text for the post." });
    try {
        const getResponse = await users.get();
        for (let i = 0; i < getResponse.length; i++) {
            if (getResponse[i].id == userId) {
                try {
                    const updateResponse = await posts.update(id, { userId, text });
                    if (updateResponse === 0) next({ code: 404, message: 'The post with the specified ID does not exist.' });
                    try {
                        const findResponse = await posts.get(id);
                        return res.status(200).json(findResponse);
                    } catch (err) {
                        next({ code: 500, error: 'The post information could not be retrieved.' });
                    }
                } catch (err) {
                    next({ code: 500, error: "The posts information could not be modified." });
                }
            }
        }
        next({ code: 400, errorMessage: 'Please provide a userId that matches an existing users id.' });
    } catch (err) {
        next({ code: 500, error: 'The posts information could not be retrieved.' });
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const findResponse = await posts.get(req.params.id);
        try {
            const removeResponse = await posts.remove(req.params.id);
            if (removeResponse === 0) next({ code: 404, message: "The post with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            next({ code: 500, error: "The post could not be removed" });
        }
    } catch (err) {
        next({ code: 500, error: "The post information could not be retrieved." });
    }
})

router.use(errorHandler.errorHandler);

module.exports = router;