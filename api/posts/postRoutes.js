const express = require('express');
const posts = require('../../data/helpers/postDb');

const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text) return res.status(400).json({ errorMessage: "Please provide userId and text for the post." });
    try {
        const findResponse = await users.get();
        for (let i = 0; i < findResponse.length; i++) {
            if (findResponse[i].id == userId) {
                try {
                    const response = await posts.insert({ userId, text });
                    return res.status(201).json(response);
                } catch (err) {
                    return res.status(500).json({ error: 'There was an error while saving the post to the database.' });
                }
            }
        }
        return res.status(400).json({ errorMessage: 'Please provide a userId that matches an existing users id.' });
    } catch (err) {
        return res.status(500).json({ error: 'The posts information could not be retrieved.' });
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await posts.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The posts information could not be retrieved.' });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const response = await posts.get(req.params.id);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The post information could not be retrieved.' });
    }
})

router.get('/tags/:id', async (req, res) => {
    try {
        const response = await posts.getPostTags(req.params.id);
        if (response.length === 0) return res.status(404).json({ message: 'This post has no tags!' });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The post information could not be retrieved.' });
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body;
    if (!userId || !text) return res.status(400).json({ errorMessage: "Please provide userId and text for the post." });
    try {
        const getResponse = await users.get();
        for (let i = 0; i < getResponse.length; i++) {
            if (getResponse[i].id == userId) {
                try {
                    const updateResponse = await posts.update(id, { userId, text });
                    if (updateResponse === 0) return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
                    try {
                        const findResponse = await posts.get(id);
                        return res.status(200).json(findResponse);
                    } catch (err) {
                        return res.status(500).json({ error: 'The post information could not be retrieved.' });
                    }
                } catch (err) {
                    return res.status(500).json({ error: "The posts information could not be modified." });
                }
            }
        }
        return res.status(400).json({ errorMessage: 'Please provide a userId that matches an existing users id.' });
    } catch (err) {
        return res.status(500).json({ error: 'The posts information could not be retrieved.' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const findResponse = await posts.get(req.params.id);
        try {
            const removeResponse = await posts.remove(req.params.id);
            if (removeResponse === 0) return res.status(404).json({ message: "The post with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            return res.status(500).json({ error: "The post could not be removed" });
        }
    } catch (err) {
        return res.status(500).json({ error: "The post information could not be retrieved." });
    }
})

module.exports = router;