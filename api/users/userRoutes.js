const express = require('express');
const users = require('../../data/helpers/userDb');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ errorMessage: "Please provide a name for the user." });
    if (name.length > 128) return res.status(400).json({ errorMessage: "Name provided is too long!" });;
    try {
        const response = await users.insert({ name });
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'There was an error while saving the user to the database.' });
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await users.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The users information could not be retrieved.' });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const response = await users.get(req.params.id);
        if (!response) return res.status(404).json({ message: "The user with the specified ID does not exist." });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The user information could not be retrieved.' });
    }
})

router.get('/posts/:id', async (req, res) => {
    try {
        const response = await users.getUserPosts(req.params.id);
        if (response.length === 0) return res.status(404).json({ message: 'This user has no posts!' });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The user information could not be retrieved.' });
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ errorMessage: "Please provide a name for the user." });
    if (name.length > 128) return res.status(400).json({ errorMessage: "Name provided is too long!" });;
    try {
        const updateResponse = await users.update(id, { name });
        if (updateResponse === 0) return res.status(404).json({ message: 'The user with the specified ID does not exist.' });
        try {
            const findResponse = await users.get(id);
            if (!findResponse) return res.status(404).json({ message: "The user with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            return res.status(500).json({ error: 'The user information could not be retrieved.' });
        }
    } catch (err) {
        return res.status(500).json({ error: "The users information could not be modified." });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const findResponse = await users.get(req.params.id);
        if (!findResponse) return res.status(404).json({ message: "The user with the specified ID does not exist." });
        try {
            const removeResponse = await users.remove(req.params.id);
            if (removeResponse === 0) return res.status(404).json({ message: "The user with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            return res.status(500).json({ error: "The user could not be removed" });
        }
    } catch (err) {
        return res.status(500).json({ error: "The user information could not be retrieved." });
    }
})

module.exports = router;
