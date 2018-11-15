const express = require('express');
const cors = require('cors');

const posts = require('./helpers/postDb.js');
const tags = require('./helpers/tagDb.js');
const users = require('./helpers/userDb.js');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

const tagToUpper = (req, res, next) => {
    req.body.tag = req.body.tag.toUpperCase();
    next();
};

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




server.listen(port, () => console.log(`Server running on port ${port}`));