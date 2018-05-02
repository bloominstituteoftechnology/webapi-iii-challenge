const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userDb = require('./data/helpers/userDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const postDb = require('./data/helpers/postDb.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.send('API running');
});


server.get('/api/users', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(err => { 
            res.status(500).json({ error: "The user information could not be found." });
        });
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    userDb
        .get(id)
        .then(users => {
            res.json(users);
        })
        .catch(err => { 
            res.status(500).json({ error: "The user information could not be found." });
        });
})

server.get('/api/users/:id/posts', (req, res) => {
    const id = req.params.id;
    userDb
        .getUserPosts(id)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be found." });
        })
})

server.post('/api/users', (req, res) => {
    const name = req.body;
    userDb
        .insert(name)
        .then(name => {
            res.json(name);
        })
        .catch(err => { 
            res.status(500).json({ error: "The user information could not be created." });
        });
})

server.listen(5000, () => console.log('\n== API running on port 5000 ==\n'));