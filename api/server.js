const express = require('express');
const dbUsers = require('../data/helpers/userDb.js');
const dbPosts = require('../data/helpers/postDb.js');
const upperCase = require('./middleware/upperCase.js');

const server = express();

server.use(express.json());


server.get('/api/users', (req, res) => {
    dbUsers.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not retrieve users.', err });
        })
});

server.get('/api/users/:id', (req, res) => {
    dbUsers.getUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error loading posts.', err });
        })

});

server.post('/api/users', upperCase, (req, res) => {
    dbUsers.insert(req.body)
        .then(userId => {
            res.status(201).json({ userId });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error creating user.', err });
        })
});

server.put('/api/users/:id', upperCase, (req, res) => {
    dbUsers.update(req.params.id, req.body)
        .then(count => {
            res.status(400).json({ count });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error updating user.', err });
        })
});

server.delete('/api/users/:id', (req, res) => {
    dbUsers.remove(req.params.id)
        .then(count => {
            res.status(200).json({ count });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error deleting user', err });
        })
});

server.get('/api/posts', (req, res) => {
    dbPosts.get()
        .then(posts => {
            res.status(200).json({ posts });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error retrieving posts', err });
        })
});

server.get('/api/posts/:id', (req, res) => {
    dbPosts.get(req.params.id)
        .then(post => {
            res.status(200).json({ post });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error retrieving posts', err });
        })
});

server.get('/api/posts/tags/:id', (req, res) => {
    dbPosts.getPostTags(req.params.id)
        .then(tags => {
            res.status(200).json({ tags });
        })
        .catch(err => {
            res. status(500).json({ error: 'Error getting post tags', err });
        })
});

module.exports = server;