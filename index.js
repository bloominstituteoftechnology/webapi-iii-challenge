const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const customMW = require('./data/customMW')

const userDb = require('./data/helpers/userDb')
const postDb = require('./data/helpers/postDb')

const server = express();
const PORT = 5000;

//middleware
server.use(express.json());
server.use(logger('tiny'));
server.use(helmet());
server.use(customMW.uppercaseUser);

//route handlers

//POST new user
server.post('/api/users/', (req, res) => {
    const newUser = req.body;
    if (newUser.name) {
        userDb.insert(newUser)
            .then(id => {
                res.json(id)
            })
            .catch(err => {
                res.status(500)
                    .json({ error: "There was an error while saving the user to the database" })
            })
    }
    else {
        res.status(400)
            .json({ errorMessage: "Please provide the name of the user." })
    }
})

//POST new post
server.post('/api/posts/', (req, res) => {
    const newPost = req.body;
    if (newPost.text && newPost.userId) {
        postDb.insert(newPost)
            .then(id => {
                res.json(id)
            })
            .catch(err => {
                res.status(500)
                    .json({ error: "There was an error while saving the post to the database" })
            })
    }
    else {
        res.status(400)
            .json({ errorMessage: "Please provide the text of the post and the user ID." })
    }
})

//GET users
server.get('/api/users', (req, res) => {
    userDb.get()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The users information could not be retrieved." })
        })
})

//GET posts
server.get('/api/posts', (req, res) => {
    postDb.get()
        .then(p => {
            if (p) {
                res.json(p);
            }
            else {
                res.status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get user" })
        })
});

//GET one user's posts
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.getUserPosts(id)
        .then(p => {
            if (p) {
                res.json(p);
            }
            else {
                res.status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get user" })
        })
});

//GET one post
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb.get(id)
        .then(p => {
            if (p) {
                res.json(p);
            }
            else {
                res.status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get user" })
        })
});

//PUT user
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    if (updatedUser.name) {
        userDb.update(id, updatedUser)
            .then(count => {
                if (count) {
                    res.json({ message: "The user has been successfully updated." })
                }
                else {
                    res.status(404)
                        .json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res.status(500)
                    .json({ error: "The post information could not be modified." })
            })
    }
    else {
        res.status(400)
            .json({ errorMessage: "Please provide name for the user." })
    }
})

//DELETE user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: "User succesfully deleted." });
            }
            else {
                res.status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ error: "The user could not be removed" })
        })
})

//LISTEN
server.listen(PORT, err => {
    console.log(`listening on port ${PORT}`)
})