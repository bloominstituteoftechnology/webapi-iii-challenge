const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig.js');
const users = require('./data/helpers/userDb.js');
const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000" }));

server.get('/', (req, res) => {
        res.json('Howdy!')
});

//Users
server.get('/api/users/', (req, res) => {
    users
    .get()
    .then(response => {
        console.log(response)
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
})

//Posts
server.get('/api/posts', (req, res) => {
    posts
    .get()
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
});

//Tags
server.get('/api/tags', (req, res) => {
    tags
    .get()
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
});



server.listen(port, () => console.log(`Server running on port ${port}`));