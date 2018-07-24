const express = require('express');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');

const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ errorMessage: "Please provide a name for the user." });
    users
        .insert({ name })
        .then(users => res.status(201).json(users))
        .catch(err => res.status(500).json({ error: 'There was an error while saving the user to the database.' }));
})

server.get('/api/users', (req, res) => {
    users
        .get()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
})

server.get('/api/users/:id', (req, res) => {
    users
        .get(req.params.id)
        .then(user => {
            if (user.length === 0) return res.status(404).json({ message: "The user with the specified ID does not exist." });
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ error: 'The user information could not be retrieved.' }));
})

server.get('/api/users/posts/:id', (req, res) => {
    users
        .getUserPosts(req.params.id)
        .then(posts => {
            if (posts.length === 0) return res.status(404).json({ message: 'This user has no posts!' });
            res.status(200).json(posts);
        })
        .catch(err => res.status(500).json({ error: 'The user information could not be retrieved.' }));
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ errorMessage: "Please provide a name for the user." });
    users
        .update(id, { name })
        .then(response => {
            if (response === 0) return res.status(404).json({ message: 'The user with the specified ID does not exist.' });
            users
                .get(id)
                .then(user => {
                    if (user.length === 0) return res.status(404).json({ message: "The user with the specified ID does not exist." });
                    res.status(200).json(user);
                })
                .catch(err => res.status(500).json({ error: 'The user information could not be retrieved.' }));
        })
        .catch(err => res.status(500).json({ error: "The users information could not be modified." }));
})

server.delete('/api/users/:id', (req, res) => {
    users
        .get(req.params.id)
        .then(user => {
            if (user.length === 0) return res.status(404).json({ message: "The user with the specified ID does not exist." });
            res.status(200).json(user);
            users
                .remove(req.params.id)
                .then(response => {
                    if (response === 0) return res.status(404).json({ message: "The user with the specified ID does not exist." });
                })
                .catch(err => res.status(500).json({ error: "The user could not be removed" }));
        })
        .catch(err => res.status(500).json({ error: "The user information could not be retrieved." }))
})

// END OF USERS

server.post('/api/posts', (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text) return res.status(400).json({ errorMessage: "Please provide userId and text for the post." });
    posts
        .insert({ userId, text })
        .then(posts => res.status(201).json(posts))
        .catch(err => res.status(500).json({ error: 'There was an error while saving the post to the database.' }));
})

server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
})

server.get('/api/posts/:id', (req, res) => {
    posts
        .get(req.params.id)
        .then(post => {
            if (post.length === 0) return res.status(404).json({ message: "The post with the specified ID does not exist." });
            res.status(200).json(post);
        })
        .catch(err => res.status(500).json({ error: 'The post information could not be retrieved.' }));
})

server.get('/api/posts/tags/:id', (req, res) => {
    posts
        .getPostTags(req.params.id)
        .then(tags => {
            if (tags.length === 0) return res.status(404).json({ message: 'This post has no tags!' });
            res.status(200).json(tags);
        })
        .catch(err => res.status(500).json({ error: 'The post information could not be retrieved.' }));
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body;
    if (!userId || !text) return res.status(400).json({ errorMessage: "Please provide userId and text for the post." });
    posts
        .update(id, { userId, text })
        .then(response => {
            if (response === 0) return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            posts
                .get(id)
                .then(post => {
                    if (post.length === 0) return res.status(404).json({ message: "The post with the specified ID does not exist." });
                    res.status(200).json(post);
                })
                .catch(err => res.status(500).json({ error: 'The post information could not be retrieved.' }));
        })
        .catch(err => res.status(500).json({ error: "The posts information could not be modified." }));
})

server.delete('/api/posts/:id', (req, res) => {
    posts
        .get(req.params.id)
        .then(post => {
            if (post.length === 0) return res.status(404).json({ message: "The post with the specified ID does not exist." });
            res.status(200).json(post);
            posts
                .remove(req.params.id)
                .then(response => {
                    if (response === 0) return res.status(404).json({ message: "The post with the specified ID does not exist." });
                })
                .catch(err => res.status(500).json({ error: "The post could not be removed" }));
        })
        .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
})

// END OF POSTS

server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    if (!tag) return res.status(400).json({ errorMessage: "Please provide a tag." });
    tags
        .insert({ tag })
        .then(tags => res.status(201).json(tags))
        .catch(err => res.status(500).json({ error: 'There was an error while saving the tag to the database.' }));
})

server.get('/api/tags', (req, res) => {
    tags
        .get()
        .then(tags => res.status(200).json(tags))
        .catch(err => res.status(500).json({ error: 'The tags information could not be retrieved.' }));
})

server.get('/api/tags/:id', (req, res) => {
    tags
        .get(req.params.id)
        .then(tag => {
            if (tag.length === 0) return res.status(404).json({ message: "The tag with the specified ID does not exist." });
            res.status(200).json(tag);
        })
        .catch(err => res.status(500).json({ error: 'The tag information could not be retrieved.' }));
})

server.put('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    if (!tag) return res.status(400).json({ errorMessage: "Please provide a tag." });
    tags
        .update(id, { tag })
        .then(response => {
            if (response === 0) return res.status(404).json({ message: 'The tag with the specified ID does not exist.' });
            tags
                .get(id)
                .then(tag => {
                    if (tag.length === 0) return res.status(404).json({ message: "The tag with the specified ID does not exist." });
                    res.status(200).json(tag);
                })
                .catch(err => res.status(500).json({ error: 'The tag information could not be retrieved.' }));
        })
        .catch(err => res.status(500).json({ error: "The tags information could not be modified." }));
})

server.listen(8000, () => console.log('API is running on port 8000'));