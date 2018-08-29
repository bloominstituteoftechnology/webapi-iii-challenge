const express = require('express');
const server = express();
const helmet = require('helmet');

//db helpers
const dbUsers = require("./data/helpers/userDb.js");
const dbPosts = require("./data/helpers/postDb.js");

server.use(express.json());
server.use(helmet());

//MIDDLEWARE
function upperCase(req, res, next) {
    req.upperName = req.body.name.toUpperCase();
    next();
};

server.get("/", (req, res) => {
    res.send("Testing")
});

//USERS
server.get("/users", (req, res) => {
    dbUsers.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => console.log(err));
});

server.get("/users/:userId", (req, res) => {
    const {userId} = req.params;
    dbUsers.get(userId)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Failed to retrieve user with the specific userId." })
    });
})

server.get("/users/:userId/posts/:postId", (req,res) => {
    const {userId, postId} = req.params
    if(userId === postId) {
        dbUsers.getUserPosts(userId)
        .then(posts => {res.status(200).json(posts)})
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Post with correlated User ID is not found." })
        })
    } else {
        res.status(400).json({ message: "UserId and PostId do not match. Please check and try again." })
    }
});

server.post("/users", upperCase, (req,res) => {
    const {name} = req.body;
    const upperName = req.upperName;
    if(!name) {
        res.status(400).json({ message: "Please enter a name." });
    } 
    else if(name.length > 128) {
        res.status(406).json({ message: "Name is too long. Please limit name length to 128 characters or less." });
    } 
    else {
        dbUsers.insert({name: upperName})
        .then(user => { res.status(200).json(user) })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to create new user." })
        });
    }
})

server.put("/users/:userId", upperCase, (req,res) => {
    const upperName = req.upperName;
    req.body.name = upperName;
    dbUsers.update(req.params.userId, req.body)
    .then(user => { res.status(200).json(user) })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Updated failed." })
    });
})

server.delete("/users/:userId", (req,res) => {
    dbUsers.remove(req.params.userId)
    .then(count => { res.status(200).json({ message: `${count} users deleted.`} )})
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Cannot delete user." })
    })
})

//POSTS
server.get("/posts", (req, res) => {
    dbPosts.get()
    .then(posts => { res.status(200).json(posts) })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Failed to retrieve post data." })
    });
});

server.get("/posts/:postId", (req, res) => {
    const {postId} = req.params;
    dbPosts.get(postId)
    .then(post => { res.status(200).json(post) })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Failed to retrieve post(s) with the specific PostId." })
    })
})

server.post("/posts", (req, res) => {
    const {userId} = req.params;
    console.log(userId);
    const post = req.body;
    if (!post.text) {
        res.status(400).json({ message: "Cannot be blank. Please enter some text." })
    } else if(!post.userId) {
        res.status(400).json({ message: "Field required. UserId must be entered." })
    } 
    //else if() {

    // } 
    else {
        dbPosts.insert(post)
        .then(post => { res.status(200).json(post) })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Failed to create new post." })
        })
    }
});

server.delete("/posts/:postId", (req, res) => {
    const {postId} = req.params;
    dbPosts.remove(postId)
    .then(count => res.status(200).json({ message: `${count} posts deleted.`} ))
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Failed to delete post." })
    });
});

server.listen(9000, () => console.log("===API on port 9000==="));