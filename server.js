const express = require('express');
const server = express();
const userDb = require('./data/helpers/userDb.js')

server.use(express.json());

server.get("/api/users", (req, res) => {
    userDb.get().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({ error: "Error retrieving data" })
    })
});
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    userDb.get(id).then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ error: "user does not exist" })
        }
    }).catch(err => {
        res.status(500).status.json({ error: "User could not be retrieved" })
    })
});
server.post("/api/users", (req, res) => {
    const data = req.body
    if (data.name) {
        userDb.insert(data).then(userId => {
            userDb.get(userId.id).then(user => {
                res.status(201).json(user)
            }).catch(err => {
                res.status(500).json({ error: "Error accessing this user" })
            })
        }).catch(err => {
            res.status(500).json({ error: "Error updating info in database" })
        })
    } else { res.status(400).json({ error: "User name must be provided" }) }
});
server.listen(5000); 