const express = require('express');
const userDB = require("../data/helpers/userDb.js");
const postDB = require("../data/helpers/postDb");
const server = express();

server.use(express.json());

function uppercaser(req, res, next) {
    // next points to the next middleware/route handler in the queue
    req.body.name = req.body.name.toUpperCase();
    next();
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

server.get("/api/posts", (req, res) => {
    postDB.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts could not be retrieved." },
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

server.post("/api/users", uppercaser, async (req, res) => {
    try {
        const userData = req.body;
        if (userData.name === "" || userData.name === undefined) {
            res.status(400).json({ error: "Please provide username." })
        }
        else {
            const user = await userDB.insert(userData);
            res.status(201).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    }
})

server.put("/api/users/:id", uppercaser, (req, res) => {
    const {id} = req.params;
    const user = req.body;

    userDB.update(id, user)
        .then(count => {
            if (user.name === "" || user.name === undefined) {
                res.status(400).json({ errorMessage: "Please provide username." });
            }
            if(count) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
})

server.delete("/api/users/:id", (req, res) => {
    const {id} = req.params;

    userDB.remove(id)
        .then(count => {
            if(count) {
                res.status(200).json(count);
            }
            else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" })
        })
})

module.exports = server;