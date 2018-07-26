const express = require('express');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

server.post('/api/users', async (req, res) => {
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

server.get('/api/users', async (req, res) => {
    try {
        const response = await users.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The users information could not be retrieved.' });
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const response = await users.get(req.params.id);
        if (!response) return res.status(404).json({ message: "The user with the specified ID does not exist." });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The user information could not be retrieved.' });
    }
})

server.get('/api/users/posts/:id', async (req, res) => {
    try {
        const response = await users.getUserPosts(req.params.id);
        if (response.length === 0) return res.status(404).json({ message: 'This user has no posts!' });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The user information could not be retrieved.' });
    }
})

server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ errorMessage: "Please provide a name for the user." });
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

server.delete('/api/users/:id', async (req, res) => {
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

// END OF USERS

server.post('/api/posts', async (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text) return res.status(400).json({ errorMessage: "Please provide userId and text for the post." });
    try {
        const response = await posts.insert({ userId, text });
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'There was an error while saving the post to the database.' });
    }
})

server.get('/api/posts', async (req, res) => {
    try {
        const response = await posts.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The posts information could not be retrieved.' });
    }
})

server.get('/api/posts/:id', async (req, res) => {
    try {
        const response = await posts.get(req.params.id);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The post information could not be retrieved.' });
    }
})

server.get('/api/posts/tags/:id', async (req, res) => {
    try {
        const response = await posts.getPostTags(req.params.id);
        if (response.length === 0) return res.status(404).json({ message: 'This post has no tags!' });
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The post information could not be retrieved.' });
    }
})

server.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body;
    if (!userId || !text) return res.status(400).json({ errorMessage: "Please provide userId and text for the post." });
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
})

server.delete('/api/posts/:id', async (req, res) => {
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

// END OF POSTS

server.post('/api/tags', async (req, res) => {
    const { tag } = req.body;
    if (!tag) return res.status(400).json({ errorMessage: "Please provide a tag." });
    try {
        const response = await tags.insert({ tag });
        return res.status(201).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'There was an error while saving the tag to the database.' });
    }
})

server.get('/api/tags', async (req, res) => {
    try {
        const response = await tags.get();
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The tags information could not be retrieved.' });
    }
})

server.get('/api/tags/:id', async (req, res) => {
    try {
        const response = await tags.get(req.params.id);
        if (!response) return res.status(404).json({ message: "The tag with the specified ID does not exist." });
        res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ error: 'The tag information could not be retrieved.' });
    }
})

server.put('/api/tags/:id', async (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    if (!tag) return res.status(400).json({ errorMessage: "Please provide a tag." });
    try {
        const updateResponse = await tags.update(id, { tag });
        if (updateResponse === 0) return res.status(404).json({ message: 'The tag with the specified ID does not exist.' });
        try {
            const findResponse = await tags.get(id);
            if (!findResponse) return res.status(404).json({ message: "The tag with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            return res.status(500).json({ error: 'The tag information could not be retrieved.' });
        }
    } catch (err) {
        return res.status(500).json({ error: "The tags information could not be modified." });
    }
})

server.delete('/api/tags/:id', async (req, res) => {
    try {
        const findResponse = await tags.get(req.params.id);
        if (!findResponse) return res.status(404).json({ message: "The tag with the specified ID does not exist." });
        try {
            const removeResponse = await tags.remove(req.params.id);
            if (removeResponse === 0) return res.status(404).json({ message: "The tag with the specified ID does not exist." });
            return res.status(200).json(findResponse);
        } catch (err) {
            return res.status(500).json({ error: "The tag could not be removed" });
        }
    } catch (err) {
        return res.status(500).json({ error: "The tag information could not be retrieved." });
    }
})

server.listen(8000, () => console.log('API is running on port 8000'));