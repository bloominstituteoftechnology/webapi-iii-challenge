const express = require('express');
const db = require('../data/helpers/userDb.js');
const upperCase = require('./middleware/upperCase.js');

const server = express();

server.use(express.json());


server.get('/api/users', (req, res) => {
    db.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not retrieve users.', err });
        })
});

server.get('/api/users/:id', (req, res) => {
    db.getUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error loading posts.', err });
        })

});

server.post('/api/users', upperCase, (req, res) => {
    db.insert(req.body)
        .then(userId => {
            res.status(201).json({ userId });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error creating user.', err });
        })
});

server.put('/api/users/:id', upperCase, (req, res) => {
    db.update(req.params.id, req.body)
        .then(count => {
            res.status(400).json({ count });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error updating user.', err });
        })
});

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            res.status(200).json({ count });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error deleting user', err });
        })
});

module.exports = server;