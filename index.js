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

server.listen(8000, () => console.log('API is running on port 8000'));