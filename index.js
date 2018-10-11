const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');

// Middleware

// express.json() teaches express to parse json info from req.body! 
server.use(express.json(), cors(), morgan(), helmet());

const nameToUpCase = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
}


// Get all users
server.get('/users', (req, res) => {
    userDb.get()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: "The user info could not be found" }));
})

// Get all users posts
server.get('/users/:id', (req, res) => {
    userDb.getUserPosts(req.params.id)
        .then(user => user.length > 0 ? res.json(user) : res.status(404).json({
            message: "The user with the specfic ID does not exist."
        }))
        .catch(err => res.status(500).json({ error: "The user info could not be found" }));
})

// Post user
server.post('/users', nameToUpCase, (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    userDb.insert( newUser )
        .then(userId => {
            const { id } = userId;
            userDb.get(id)
                .then(user => {
                    if(!user) {
                        res.status(400).json({ error: "A name for the user is needed" })
                    }
                    res.status(201).json(user)
                })
        })
        .catch(err => res.status(500).json({ error: "Character could not be created, check key value pair" }))
        
})

const port = 3400;
server.listen(port, () => console.log(`\n === Port ${port} === \n`));