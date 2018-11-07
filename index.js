const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const port = 9000;
const userDb = require("./data/helpers/userDb.js");
const server = express();
server.use(morgan("dev"), cors(), helmet(), express.json());


//middleware here 

const allCaps = (req, res, next) => {
    console.log(req.body);

    Object.assign(req.body, { name: req.body.name.toUpperCase() });

    next();
};

//Get all users
server.get("/api/users", (req, res) => {
    userDb
    .get()
    .then(users => {
        res.json(users);
    })
    .catch(err =>
        res.status(500).json({
        error: "The users information could not be retrieved."
        })
    );
});


//Gets posts of a user
server.get("/api/users/:id/posts", (req, res) => {
    userDb
    .getUserPosts(req.params.id)
    .then(user => {
        if (user.length > 0) {
        res.json(user);
        } else
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        });
    })
    .catch(err =>
        res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});


//Add new user
server.post("/api/users", allCaps, (req, res) => {
    const newUser = req.body;
    if (newUser.name.length > 128) {
        return res.status(411).json({
        user, message: " The user name must be under 129 characters."
        });
    }
    userDb
    .insert(newUser)
    .then(user => {
        res.status(201).json({user, message: "The user was added successfully"});
    })
    .catch(err => {
        res.status(500).json({
        error: "There was an error while saving the user to the database."
        });
    });
});


    //Delete a user
server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    userDb
    .remove(id)
    .then(user => {
        if (user.length < 1) {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        });
        } else {
        res.status(200).json(user);
        }
    })
    .catch(err =>
        res.status(500).json({
        error: "The user could not be removed."
        })
    );
});

//update post
server.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { text, userId } = req.body;
    const newPost = { text, userId };
    if (!text || !userId) {
    return res
        .status(400)
        .json({ error: "Please provide a userId and text for the post." });
    }
    postDb
    .update(id, newPost)
    .then(post => {
        if (post.length < 1) {
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        });
        } else {
        res.status(200).json(post);
        }
    })
    .catch(err =>
        res.status(500).json({
        error: "The post information could not be modified.."
        })
    );
});

    // call server.listen w/ a port of your choosing (9000)
server.listen(port, () => {
    console.log(`\n === API running on port ${port} ===\n`);
});