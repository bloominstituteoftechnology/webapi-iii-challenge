const express = require('express');
const userDB = require('../data/helpers/userDb.js');
// const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    userDB.get().then(user => {
        res.status(200).json(user);
    }).catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;

    userDB.get(id).then(user => {
        if (user.length !== 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    }).catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
});

module.exports = server;