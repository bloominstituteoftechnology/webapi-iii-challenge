//https://github.com/LambdaSchool/Node-Blog/pull/360

const express = require('express');
const db = require('../data/helpers/postDb.js');

const server = express();

server.get('/api/users', (req, res) => {
    db.get()
        .then(posts => {
            res.json({ posts })
        })
})

module.exports = server;