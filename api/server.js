const express = require('express');
const userDB = require("../data/helpers/userDb.js");
const postDB = require("../data/helpers/postDb");
const server = express();

function uppercaser(req, res, next) {
    // next points to the next middleware/route handler in the queue
    console.log(req.body);
  }

server.get("/api/users", (req, res) => {
    userDB.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The user information could not be retrieved." },
                console.log(err))
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    userDB.getUserPosts(id)
        .then(posts => {
            if (posts[0] === undefined){
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            else {
                res.status(200).json(posts);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user's post information could not be retrieved." });
        })
})

module.exports = server;