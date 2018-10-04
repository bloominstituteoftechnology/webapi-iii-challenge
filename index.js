//pull in express
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const port = 9000;

//define databases
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
// const tagDb = require('./data/helpers/tagDb');

//build server
const server = express();

//called middleware
const upperCaseName = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
}

//global middleware
server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(logger('short'));

//Create/Post User
    server.post('/users', upperCaseName, (req, res) => {
        if(!req.body.name) {
            res.status(400).json({errorMessage: "Please provide name for new user."})
        } else if (req.body.name.length > 128) {
            res.status(400).json({errorMessage: "Please choose a username that is less than 128 characters."})
        } 
        userDb.insert(req.body)
            .then(userId => {
                console.log(userId);
                res.status(201).json(userId); 
            })
            .catch(() => res.status(500).json({error: "There was an error while saving the user to the database"}))
    });

//Read/Get Users/User
    server.get('/users', (req, res) => {
        userDb.get()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(() => res.status(500).json({error: "Could not retrieve users"}));
    });

//Update/Put User
    server.put('/user/:id', upperCaseName, (req, res) => {
        const id = req.params.id; 
        if(!id) {
            res.status(404).json({message: "Could not find specified user"});
        } else if(!req.body.name) {
            res.status(400).json({errorMessage: "Please provide updated name for existing user."})
        }
        userDb.update(id, req.body)
            .then(() => {
                res.status(200).json({message: "Update successful"})
            })
            .catch(() => res.status(500).json({error: "The user could not be updated."}))
    })

//Delete/Delete User
    server.delete('/user/:id', (req, res) => {
        const id = req.params.id; 
        if(!id) {
            res.status(404).json({message: "Could not find specified user"});
        }
        userDb.remove(id)
            .then(removedUser => {
                res.status(200).json(removedUser);
            })
            .catch(() => res.status(500).json({error: "The user could not be removed."}))
    })

//Read/Get Posts by User
    server.get('/user/:id', (req, res) => {
        const id = req.params.id;
        if(!id) {
            res.status(404).json({message: "Could not find specified user"});
        }
        userDb.getUserPosts(id)
            .then(posts => {
                console.log(posts);
                res.status(200).json(posts);
            })
            .catch(() => res.status(500).json({error: `The posts for user with id:${id} could not be retrieved.`}))
    });

//Create/Post Post
    server.post('/posts', (req, res) => {
        if(!req.body.text) {
            res.status(400).json({errorMessage: "Please provide text for new post."})
        } 
        postDb.insert(req.body)
            .then(postId => {
                console.log(postId);
                res.status(201).json(postId); 
            })
            .catch(() => res.status(500).json({error: "There was an error while saving the user to the database"}))
    });
//Read/Get Post
    server.get('/posts', (req, res) => {
        postDb.get()
            .then(posts => {
                res.status(200).json(posts);
            })
            .catch(() => res.status(500).json({error: "Could not retrieve users"}));
    });

//Update/Put Post
    server.put('/post/:id', (req, res) => {
        const id = req.params.id; 
        if(!id) {
            res.status(404).json({message: "Could not find specified user"});
        } else if(!req.body.text) {
            res.status(400).json({errorMessage: "Please provide updated text for existing post."})
        }
        postDb.update(id, req.body)
            .then(() => {
                res.status(200).json({message: "Update successful"})
            })
            .catch(() => res.status(500).json({error: "The post could not be updated."}))
    })

//Delete/Delete Post
    server.delete('/post/:id', (req, res) => {
        const id = req.params.id; 
        if(!id) {
            res.status(404).json({message: "Could not find specified post"});
        }
        postDb.remove(id)
            .then(removedPost => {
                res.status(200).json(removedPost);
            })
            .catch(() => res.status(500).json({error: "The post could not be removed."}))
    })

//catch if user is incorrect 
server.use(function(req, res) {
    res.status(404).send("Golden egg! One-thousand points, Gryffindor! Also, 404.");
});
    

server.listen(port, () => console.log(`Listening to API on port ${port}`));