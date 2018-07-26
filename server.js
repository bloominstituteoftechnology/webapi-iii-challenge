const express = require('express');

const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

const server = express();

server.use(express.json());

// GET | Returns the stored posts / tags / users

server.get('/', (req, res) => {
    res.send({ hello: 'world', project: "blog" });
});

server.get('/users/', (req, res) => {
    userDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get users.`})
    })
})

server.get('/posts/', (req, res) => {
    postDb.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get users.`})
    })
})

server.get('/tags/', (req, res) => {
    tagDb.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get users.`})
    })
})

// GET | Returns the post / tag / user with the specified id

server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    userDb.get()
    .then(response => {
        if(response.length === 0) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get user.`})
    })
})

server.get('/posts/:id', (req, res) => {
    const id = req.params.id;

    postDb.get()
    .then(response => {
        if(response.length === 0) {
            res.status(404).json({ error: "Post not found." });
            return;
        }
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get post.`})
    })
})

server.get('/tags/:id', (req, res) => {
    const id = req.params.id;

    tagDb.get()
    .then(response => {
        if(response.length === 0) {
            res.status(404).json({ error: "Tag not found." });
            return;
        }
        res.status(200).json(response)
    })
    .catch(() => {
        res
        .status(500).json({ error: `Couldn't get tag.`})
    })
})


// 

server.listen(8100, () => console.log('Blog API running on port 8100 . . .'));