const express = require('express');

const users = require('./data/helpers/userDb');
const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');

const server = express();
server.use(express.json());

const port = 4000;

// GET users, posts, tags

server.get('/api/users', (req, res) => {
    users
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json({error: "The users information could not be retrieved."})
        })
})

server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})

server.get('/api/tags', (req, res) => {
    tags
        .get()
        .then(tags => {
            res.json(tags);
        })
        .catch(error => {
            res.status(500).json({error: "The tags information could not be retrieved."})
        })
})

server.listen(port, () => console.log(`Server is listening to port ${port}`));