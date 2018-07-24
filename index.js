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
        .catch(err => res.status(500).json({ error: 'There was an error while saving the user to the database.' }))
})

server.get('/api/users', (req, res) => {
    users
        .get()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }))
})

server.get('/api/users/:id', (req, res) => {
    users
        .get(req.params.id)
        .then(user => {
            if (user.length === 0) return res.status(404).json({ message: "The user with the specified ID does not exist." })
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: 'The user information could not be retrieved.' }))
})

server.get('/api/users/posts/:id', (req, res) => {
    users
        .getUserPosts(req.params.id)
        .then(posts => {
            if (posts === 0) return res.status(404, { message: 'This user has no posts!' });
            res.status(200).json(posts);
        })
        .catch(err => res.status(500).json({ error: 'The user information could not be retrieved.' }))
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
                    if (user.length === 0) return res.status(404).json({ message: "The user with the specified ID does not exist." })
                    res.status(200).json(user);
                })
                .catch(err => res.status(500).json({ error: 'The post information could not be retrieved.' }));
        })
        .catch(err => res.status(500).json({ error: "The users information could not be modified." }));
})

server.listen(8000, () => console.log('API is running on port 8000'));