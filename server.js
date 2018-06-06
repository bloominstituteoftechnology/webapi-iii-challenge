const express = require('express');
const cors = require('cors');

//const db = require('./data/db.js) --> if there's only one db.js in data folder
//but it's becoz we have helper folder where keep the data so we like below.
const users = require('./data/helpers/userDb.js');
const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000'}));

//----------- all end point starts here -----------//

server.get('/', (reg, res) => {
    res.send('Hello from Server Port 5000 (^_^)');
})

//----------- users end point -----------//

server.get('/api/users', (req, res) => {
    users
        .get()
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            console.error(error);
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .get(id)
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            console.error(error);
        })
})

//----------- posts end point -----------//

server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            console.error(error);
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
        .get(id)
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            console.error(error);
        })
})

//----------- tags end point -----------//

server.get('/api/tags', (req, res) => {
    tags
        .get()
        .then(tags => {
            res.json({ tags })
        })
        .catch(error => {
            console.error(error);
        })
})

server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags
        .get(id)
        .then(tags => {
            res.json({ tags })
        })
        .catch(error => {
            console.error(error);
        })
})


server.listen(port, () => console.log(`Server is running on port ${port}`));