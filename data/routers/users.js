// import express, define router, and define db
const express = require('express');
const router = express.Router();
const db = require('../helpers/userDb');

// import middleware
const nameMiddleware = require('../middleware/nameToUppercase')

// Create/post logic
router.post('/', nameMiddleware, (req, res) => {
    if (req.body.name) {
        const user = req.body
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

router.get('/:id', (req, res) => {
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
