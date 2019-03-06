// import express, define router, and define db
const express = require('express');
const router = express.Router();
const db = require('../helpers/userDb');

// import middleware
const nameMiddleware = require('../middleware/nameToUppercase')

// Create/post logic
router.post('/', (req, res) => {
    if (typeof req.body.name === 'string' && req.body.name.length < 128) { // check for string name, less than 128 chars.
        const user = nameMiddleware(req.body)
        db
            .insert(user) // insert user with name uppercase
            .then(newuser => {
            db
                .get(newuser)
                .then (newuser => {
                    res
                        .status(201)
                        .json(newuser)
                });
            });
        } else if (typeof req.body.name !== 'string') { // error 400 if not string
            res
                .status(400)
                .json({ err: 'user name is invalid, must be a string of length < 128!'})
        } else {
            res
                .status(500)
                .json({ err: 'user cannot be added to db!'})
        }
})

// Read/get logic
router.get('/', (req, res) => {
    db
        .get() // retrieve all users
        .then( users => {
            console.log(users) // users is an array of objects!
            res.json(users);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: 'Failed to retrieve users'})
    });
});

router.get('/:id', (req, res) => { // retrieve user by id
    const id = req.params.id; // set variable for id of get request object
    if (Number.isInteger(id)) {
        db
            .get(id)
            .then(user => {
                console.log(user) // returns looked up user object
                res
                    .status(200)
                    .json(user)
                }
            );
    } else if (!id || !Number.isInteger(id)) {
        res
            .status(404)
            .json({ err: 'User ID not found in db! (ID cannot be located, is invalid, or is not an integer)'})
    } else {
        res
        .status(500)
        .json({ err: 'Cannot retrieve user'})
    }
})

module.exports = router; // Export the route
