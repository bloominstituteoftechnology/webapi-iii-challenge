const express = require('express');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(express.json());

server.get('/users', (req, res) => {
    userDb.get().then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: "Nobody is here."})
)
})

server.get('/users/:id', (req, res) => {
    userDb.get(req.params.id)
    .then(user => {
        if(user.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json({ error: "User info could not be got"})
    });
})

server.get('/post', (req, res) => {
    postDb.get().then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: "No post here"})
)
})

server.get('/post/:id', (req, res) => {
    postDb.get(req.params.id)
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "Post info could not be got"})
    });
})

server.get('/tag', (req, res) => {
    tagDb.get().then(tags => res.status(200).json(tags))
    .catch(err => res.status(500).json({ error: "Tag, you are it"})
)
})

server.get('/tag/:id', (req, res) => {
    tagDb.get(req.params.id)
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(tags);
    })
    .catch(error => {
        res.status(500).json({ error: "Tag info could not be got"})
    });
})













server.listen(8000, () => console.log("Api running here"));