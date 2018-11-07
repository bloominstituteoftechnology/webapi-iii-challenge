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
//------------------------------------ USER-ENDPOINTS -------------------------------------------------- 
//Get all USERS
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


//Gets posts of a USER
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


//Add new USER
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


    //Delete a USER
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
//Update USER
server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    userDb
    .update(id, newUser)
    .then(user => {
        if (user.length < 1) {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        });
        } else {
        res.status(200).json({user, message: "The user was updated successfully"});
        }
    })
    .catch(err =>
        res.status(500).json({
        error: "The user information could not be modified.."
        })
    );
});

//------------------------------------ POST-ENDPOINTS -------------------------------------------------- //
//update POST
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

//Delete  POST
server.delete("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    postDb
    .remove(id)
    .then(post => {
        if (post.length < 1) {
        res.status(404).json({
            message: "The post with that ID does not exist."
        });
        } else {
        res.status(200).json(post);
        }
    })
    .catch(err =>
        res.status(500).json({
        error: "The post could not be removed."
        })
    );
});

//Add POST
server.post("/api/posts/", (req, res) => {
    const { text, userId } = req.body;
    const newPost = { text, userId };
    if (!text || !userId) {
    return res.status(400).json({ error: "Please provide text to your post." });
    }
    postDb
    .insert(newPost)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        res.status(500).json({
        error: "There was an error saving your post."
        });
    });
});

//Get all POSTS
server.get("/api/posts", (req, res) => {
    postDb
    .get()
    .then(post => {
        res.json(post);
    })
    .catch(err =>
        res.status(500).json({
        error: "The post information could not be retrieved."
        })
    );
});

    // call server.listen w/ a port of your choosing (9000)
server.listen(port, () => {
    console.log(`\n === API running on port ${port} ===\n`);
});