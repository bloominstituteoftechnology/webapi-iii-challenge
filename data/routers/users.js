// import express, define router, and define db
const express = require('express');
const router = express.Router();
const db = require('../helpers/userDb');

// READ/GET logic
router.get('/', (req, res) => {
    db
        .get() // retrieve all users
        .then((users) => {
            res.json(users);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: 'Failed to retrieve users'})
    });
});

module.exports = router; // Export the route
