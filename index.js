//pull in express
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const port = 9000;

//define databases
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

//build server
const server = express();

//called middleware
const upperCaseUser = (req, res, next) => {
    const user = req.params.user;
    req.user = user.toUpperCase();
    next();
}

//global middleware
server.use(cors());
// server.use(helmet());

//Create/Post User
    server.post('/users', (req, res) => {
        const {name} = req.body;
        res.json(name);
    //     if(!name) {
    //         res.status(400).json({error: "Please provide a key/value pair with the key set as 'name'."});
    //     }
    //     const newUser = {name};
    //     userDb.insert(newUser)
    //         .then(newUserId => {
    //             console.log(newUserId);
    //             res.status(200).json(newUserId);
    //         })
    //         .catch(() => res.status(500).json({error: "There was an error creating the user."}))
    // })

//Read/Get Users/User
    server.get('/users', (req, res) => {
        userDb.get()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(() => res.status(500).json({error: "Could not retrieve users"}));
    });

//Update/Put User

//Delete/Delete User

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
    })

//Create/Post Post

//Read/Get Post

//Update/Put Post

//Delete/Delete Post


server.listen(port, () => console.log(`Listening to API on port ${port}`));