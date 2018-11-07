const express = require('express');
const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb.js');

const gateKeeper = require('../gateKeeper/gateKeeperMiddleWare.js');

const server = express();

server.use(express.json());

// all users
server.get('/api/users', (req, res) => {
    userDb.get().then(user => {
        res.status(200).json(user);
    }).catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
});

// user by id
server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;

    userDb.get(id).then(user => {
        if (user.length !== 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
});

// all posts
server.get('/api/posts', (req, res) => {
    postDb.get().then(post => {
        res.status(200).json(post);
    }).catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
});

// posts by user id
server.get("/api/posts/:id", gateKeeper, (req, res) => {
    const { id } = req.params;
    const userId = id;

    userDb.getUserPosts(userId).then(post => {
        if (post.length !== 0) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

// posts by post id
server.get("/api/post/:id", (req, res) => {
    const { id } = req.params;

    postDb.get(id).then(post => {
        if (post.length !== 0) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

module.exports = server;