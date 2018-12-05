const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const customMW = require('./data/customMW')

const db = require('./data/helpers/userDb.js')

const server = express();
const PORT = 5000;

//middleware
server.use(express.json());
server.use(logger('tiny'));
server.use(helmet());
server.use(customMW.uppercaseUser);

//route handlers

//POST
server.post('/users/', (req, res) => {
    const newUser = req.body;
    if (newUser.name) {
        db.insert(newUser)
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

//GET
server.get('/users', (req, res) => {
    db.get()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The users information could not be retrieved." })
        })
})

//GET one user's posts
server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.getUserPosts(id)
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

//DELETE
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: "User succesfully deleted."});
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