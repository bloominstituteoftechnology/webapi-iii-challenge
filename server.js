const express = require("express");
const server = express();
const PORT = 4000;

server.use(express.json());

//CUSTOM MIDDLEWARE: STUFF SERVER DOES WITH ALL REQUESTS BEFORE MOVING ON
server.use((req, res, next) => {
    if (req.body && req.body.name && typeof req.body.name === "string") {
        let name = req.body.name;
        if (name[0].toLowerCase() === name[0]) {
            name = name.split("");
            name[0] = name[0].toUpperCase();
            name = name.join("");
            req.body.name = name;
        }
    }
    next();
});

const users = require("./data/helpers/userDb");
const posts = require("./data/helpers/postDb");

//USER APIS

//GET USERS
server.get("/api/users", (req, res) => {
    users.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({error: "Error retrieving user information"});
    });
});

//CREATE NEW USER

server.post("/api/users", (req, res) => {
    console.log(req.body)
    if (req.body && req.body.name && typeof req.body.name === "string") {
        users.insert(req.body).then(id => {
            res.status(201).json(id);
        }).catch(err => {
            res.status(500).json({error: "Error inserting user"});
        });
    } else {
        res.status(400).json({error: "Incorrectly formatted user data"});
    }
});

//GET SPECIFIC USER

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

//UPDATE USER

server.put("/api/users/:id", (req, res) => {
    if (req.body && req.body.name && typeof req.body.name === "string") {
        users.update(req.params.id, req.body).then(data => {
            res.status(200).json(data);
        }).catch(err => {
            res.status(500).json({error: "Error updating user"});
        });
    } else {
        res.status(400).json({error: "Incorrectly formatted user data"});
    }
});

//DELETE SPECIFIC USER

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

//POST APIS

//GET POSTS BY USER

server.get("/api/posts", (req, res) => {
    posts.get().then(posts => {
        if (posts) 
            res.status(200).json(posts);
        else
            res.status(404).json({error: "No posts found for user"});
    }).catch(error => {
        res.status(500).json({error: "Error retrieving posts"});
    });
});

//CREATE NEW POST

server.post("/api/posts", (req, res) => {
    if (req.body && req.body.text && req.body.userId) { //if post is formatted properly
        users.get(req.body.userId).then(user => { //find user that is making this post
            if (user) { //if user was found
                posts.insert(req.body).then(id => { //insert new post
                    res.status(201).json(id);
                }).catch(error => { //if posts.insert() fails
                    res.status(500).json({error: "Error creating post"});
                });
            } else { //if user was not found
                res.status(404).json({error: "User not found"});
            }
        }).catch(error => { //if users.get() fails
            res.status(500).json({error: "Error retrieving user information"});   
        });
    } else { //if post is not formatted properly
        res.status(400).json({error: "Incorrectly formatted post data"});
    }
});

//GET ONE POST

server.get("/api/posts/:id", (req, res) => {
    posts.get(req.params.id).then(post => {
        if (post)
            res.status(200).json(post);
        else
            res.status(404).json({error: "Post not found"});
    }).catch(err => {
        res.status(500).json({error: "Error retrieving post information"});
    });
});

//UPDATE POST

server.put("/api/posts/:id", (req, res) => {
    if (req.body && req.body.text && req.body.userId) { //if updated post is formatted properly
        users.get(req.body.userId).then(user => { //find user that this post belongs to
            if (user) { //if user was found
                posts.update(req.params.id, req.body).then(id => { //update post
                    res.status(200).json(id);
                }).catch(error => { //if posts.update() fails
                    res.status(500).json({error: "Error updating post"});
                });
            } else { //if user was not found
                res.status(404).json({error: "User not found"});
            }
        }).catch(error => { //if users.get() fails
            res.status(500).json({error: "Error retrieving user information"});   
        });
    } else { //if post is not formatted properly
        res.status(400).json({error: "Incorrectly formatted post data"});
    }
});

//DELETE POST

server.delete("/api/posts/:id", (req, res) => {
    posts.remove(req.params.id).then(data => {
        if (data)
            res.status(200).json(data);
        else
            res.status(404).json({error: "Post not found"});
    }).catch(err => {
        res.status(500).json({error: "Error deleting post"});
    });
});

server.listen(PORT, function() {
	console.log(`API server listening on port: ${PORT}`);
});