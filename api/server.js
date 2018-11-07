const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


function upperCaseUser(req, res, next) {
    if (req.body.name) {
        req.body.name = req.body.name.toUpperCase();
    }
    next();
}

server.use(upperCaseUser);

// User Requests

server.get('/api/users', (req, res) => {
    userDb.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.get(id)
        .then(user => {
            user ?
            res.status(200).json(user) :
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        })
})

server.post('/api/users', upperCaseUser, (req, res) => {
    req.body.name ?
        userDb.insert(req.body)
            .then(user => {
                res.status(201).json(user.id)
            })
            .catch(err => {
                res.status(500).json({ error: "The user could not be added." })
            })
    :
        res.status(400).json({ errorMessage: "Please provide the name for the user." })
})

server.put('/api/users/:id', upperCaseUser, (req, res) => {
    const { id } = req.params;
    req.body.name ?
        userDb.update(id, req.body)
            .then(count => {
                count === 1 ?
                res.status(200).json({ message: 'User updated'}) :
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            })
            .catch(err => {
                res.status(500).json({ error: "The user information could not be modified." })
            })
    :
        res.status(400).json({ errorMessage: "Please provide the name for the user." })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(id)
        .then(count => {
            count === 1 ?
            res.status(200).json({ message: 'User deleted'}) :
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be deleted." })
        })
})

server.get('/api/posts/user/:id', (req, res) => {
    const { id } = req.params;
    userDb.getUserPosts(id)
        .then(list => {
            list.length > 0 ?
            res.status(200).json(list) :
            res.status(404).json({ error: "The user with the specified ID has no posts or does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "Posts for the specified user could not be retrieved."})
        })
})

// Post Requests

server.get('/api/posts', (req, res) => {
    postDb.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb.get(id)
        .then(post => {
            post ?
            res.status(200).json(post) :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
})

server.post('/api/posts', (req, res) => {
    req.body.userId && req.body.text ?
        postDb.insert(req.body)
            .then(post => {
                res.status(201).json(post.id)
            })
            .catch(err => {
                res.status(500).json({ error: "The post could not be added." })
            })
    :
        res.status(400).json({ errorMessage: "Please provide the user ID and text for the post." })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    req.body.userId && req.body.text ?
        postDb.update(id, req.body)
            .then(count => {
                count === 1 ?
                res.status(200).json({ message: 'Post updated'}) :
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            })
            .catch(err => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
    :
        res.status(400).json({ errorMessage: "Please provide the user ID and text for the post." })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(id)
        .then(count => {
            count === 1 ?
            res.status(200).json({ message: 'Post deleted'}) :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be deleted." })
        })
})

module.exports = server;