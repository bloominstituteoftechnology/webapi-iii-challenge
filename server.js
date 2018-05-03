const express = require('express');
const bodyParser = require('body-parser');
const dbUsr = require('./data/helpers/userDb');
const dbPst = require('./data/helpers/postDb');
const dbTg = require('./data/helpers/tagDb');
//const db = require('./data/dbConfig');

const server = express();
server.use(bodyParser.json());


server.get('/', (req, res) => {
    res.send('Api Running');
});

// get list of all users
server.get('/api/users', (req, res) => {
    dbUsr.get().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ error: "we fucked up"});
    });
});

//get list of all tags
server.get('/api/tags', (req, res) => {
    dbTg.get().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ error: "we fucked up"});
    });
});

//get list of all posts
server.get('/api/posts', (req, res) => {
    dbPst.get().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ error: "we fucked up"});
    });
});

//get list of all posts by a user
server.get('/api/users/:id/posts', (req, res) => {
    const id = req.params.id;
    dbUsr.getUserPosts(id).then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({ error: "we fucked up"});
    });
});


server.listen(666, () => console.log('\n==API Running on port 666\n'));