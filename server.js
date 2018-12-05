const express = require("express");
const server = express();
const PORT = 4000;

server.use(express.json());

const users = require("./data/helpers/userDb");
const posts = require("./data/helpers/postDb");

server.get("/api/users", (req, res) => {
    users.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({error: "error retrieving user information"});
    });
});

server.post("/api/users", (req, res) => {
    console.log(req.body)
    if (req.body.name) {
        users.insert(req.body).then(id => {
            res.status(201).json(id);
        }).catch(err => {
            res.status(500).json({error: "error inserting user"});
        });
    } else {
        res.status(400).json({error: "Incorrectly formatted user data"});
    }
});

server.listen(PORT, function() {
	console.log(`API server listening on port: ${PORT}`);
});