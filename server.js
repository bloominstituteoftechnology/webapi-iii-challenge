const express = require('express');
const cors = require('cors');

const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');
const users = require('./data/helpers/userDb.js');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));


//---------- Get Methods ----------

server.get('/api/users', (req, res) => {
    users.get()
        .then(users => {
            res.json({ users })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.get('/api/posts', (req, res) => {
    posts.get()
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.get('/api/tags', (req, res) => {
    tags.get()
        .then(tags => {
            res.json({ tags })
        })
        .catch(err => {
            res.json({ err })
        })
});


//---------- Get by ID Methods ----------

server.get('/api/users/:id', (req, res) => {
    let { id } = req.params;
    users.get(id)
        .then(user => {
            res.json({ user })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.get('/api/posts/:id', (req, res) => {
    let { id } = req.params;
    posts.get(id)
        .then(post => {
            res.json({ post })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.get('/api/tags/:id', (req, res) => {
    let { id } = req.params;
    tags.get(id)
        .then(tag => {
            res.json({ tag })
        })
        .catch(err => {
            res.json({ err })
        })
});


//---------- Post Methods ----------

server.post('/api/users', (req, res) => {
    let { name } = req.body;
    users.insert({ name })
        .then(idObj => {
            res.json(idObj)
        })
        .catch(err => {
            res.json({ err })
        })
});

server.post('/api/posts/:userId', (req, res) => {
    let { userId } = req.params;
    let { text } = req.body;
    posts.insert({ text, userId})
        .then(idObj => {
            res.json(idObj)
        })
        .catch(err => {
            res.json({ err })
        })
});

server.post('/api/tags', (req, res) => {
    let { tag } = req.body;
    tags.insert({ tag })
        .then(idObj => {
            res.json(idObj)
        })
        .catch(err => {
            res.json({ err })
        })
});


//---------- Delete Methods ----------

server.delete('/api/users', (req, res) => {
    let { id } = req.body;
    users.remove(id)
        .then(num => {
            res.json({ num })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.delete('/api/posts', (req, res) => {
    let { id } = req.body;
    posts.remove(id)
        .then(num => {
            res.json({ num })
        })
        .catch(err => {
            res.json({ err })
        })
});

server.delete('/api/tags', (req, res) => {
    let { id } = req.body;
    tags.remove(id)
        .then(num => {
            res.json({ num })
        })
        .catch(err => {
            res.json({ err })
        })
});


server.listen(port, () => console.log(`Server running on port ${port}`));