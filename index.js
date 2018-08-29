const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb');
const server = express();
server.use(express.json());



server.get('/users/:id', (req, res) => {
    userDb.get(req.params.id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})

server.get('/user-posts/:id', (req, res) => {
    userDb.getUserPosts(req.params.id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})

server.post('/users', (req, res) => {
    userDb.insert(req.body)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})

server.put('/users/:id', (req, res) => {
    userDb.update(req.params.id, req.body)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})

server.delete('/users/:id', (req, res) => {
    userDb.remove(req.params.id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})

server.listen(7000);