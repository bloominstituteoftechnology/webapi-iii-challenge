const express = require('express');
const db = require('./data/helpers/userDb.js');

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

server.post('/api/users', (req, res) => {
    db.insert(req.body)
        .then(userId => {
            res.status(201).json({ userId });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error creating user.', err });
        })
});

server.listen(9000, () => console.log('The server is listening at port 9000'));