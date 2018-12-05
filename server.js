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
        res.status(500).json({error: "Error retrieving user information"});
    });
});

server.post("/api/users", (req, res) => {
    console.log(req.body)
    if (req.body.name) {
        users.insert(req.body).then(id => {
            res.status(201).json(id);
        }).catch(err => {
            res.status(500).json({error: "Error inserting user"});
        });
    } else {
        res.status(400).json({error: "Incorrectly formatted user data"});
    }
});

server.get("/api/users/:id", (req, res) => {
    users.get(req.params.id).then(user => {
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({error: "User not found"});
    }).catch(err => {
        res.status(500).json({error: "Error retrieving user information"});
    });
});

server.put("/api/users/:id", (req, res) => {
    if (req.body.name) {
        users.update(req.params.id, req.body).then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(500).json({error: "Error updating user"});
        });
    } else {
        res.status(400).json({error: "Incorrectly formatted user data"});
    }
});

server.delete("/api/users/:id", (req, res) => {
    users.remove(req.params.id).then(data => {
        if (data)
            res.status(200).json(data);
        else
            res.status(404).json({error: "User not found"});
    }).catch(err => {
        res.status(500).json({error: "Error deleting user"});
    });
});

server.listen(PORT, function() {
	console.log(`API server listening on port: ${PORT}`);
});