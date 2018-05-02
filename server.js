const express = require("express");
const postDb = require("./data/helpers/postDb.js");
const tagDb = require("./data/helpers/tagDb.js");
const userDb = require("./data/helpers/userDb.js");

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    userDb.get().then(user => {
        res.json(user);
    }).catch(err => {
        res.status(500).json({
            error: "The user information could not be found"
        })
    })
})

server.listen(5000, () => console.log("Listening on port 5000"));