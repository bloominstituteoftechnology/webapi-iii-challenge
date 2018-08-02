const express = require('express');
const server = express();

const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');
const users = require('./data/helpers/userDb');

server.use(express.json());

server.get('/api/users', (req, res) => {
    users.get()
        .then(response => {
            res.json(response)
        })
        .catch(() => {
            res.status(500).json({ error: "The users information could not be retrieved."})
        })
});

server.listen(5000, () => console.log('API running on port 5000'));