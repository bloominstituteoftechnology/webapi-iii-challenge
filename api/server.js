const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('short'));

// User Requests
// id (generated), name

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

server.post('/api/users', (req, res) => {
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

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    req.body.name ?
        userDb.update(id, req.body)
            .then(count => {
                count === 1 ?
                res.status(200).json({ message: 'Post Added'}) :
                res.status(404).json({ message: "The post with the specified ID does not exist." })
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
            res.status(200).json({ message: 'Post Deleted'}) :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be deleted." })
        })
})

// need correct endpoint
// server.get('/api/users/:id', (req, res) => {
//     const { id } = req.params;
//     userDb.getUserPosts(id)
//         .then(list => {
//             list.length > 0 ?
//             res.status(200).json(list) :
//             res.status(404).json(list)
//         })
//         .catch(err => {
//             res.status(500).json({ error: "Posts for the specified user could not be retrieved."})
//         })
// })
// Post Requests
// id (generated), userId, text

// get() returns array or item if passed id
// insert() passed object to add; returns object with id
// update() passed id, changes; returns count
// remove() passed id; returns count

// getUserPosts() passed user id; returns list of user's posts
module.exports = server;