//https://github.com/LambdaSchool/Node-Blog/pull/360

const express = require('express');
const db = require('../data/helpers/postDb.js');

const server = express();

server.get('/api/users', (req, res) => {
    db.get()
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            res.status(500).json({ error: "The information could not be retrieved."})
        })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then(post => {
            res.json({ post })
        })
        .catch(err => {
            res.status(500).json({ error: "The information could not be retrieved."})
        })
})


module.exports = server;