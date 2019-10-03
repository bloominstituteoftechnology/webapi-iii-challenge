const express = require('express');

const router = express.Router();

const Users = require('./userDb.js');

const validateUserId = require('../middleware/validation/users/validateUserId');

const validateUser = require('../middleware/validation/users/validateUser');

// CREATE
router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
    .then(item => {
        res.status(201).json(item)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "There was an error", err})
    })
});

// READ
router.get('/', (req, res) => {
    Users.get()
    .then(list => {
        res.status(200).json(list)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "There was an error", err})
    })
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
    console.log(req.user)
    Users.getUserPosts(req.user.id)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "There was an error", err})
    })
});

// UPDATE
router.put('/:id', validateUserId, validateUser, (req, res) => {
    Users.update(req.user.id, req.body)
    .then(item => {
        const changes = req.body
        res.status(200).json({updateSuccess: true, changes})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "There was an error", err})
    })
});

// DELETE
router.delete('/:id', validateUserId, (req, res) => {
    if (!req.user) {
        res.status(400).json({errorMessage: "Please provide an ID"})
    } else {
        Users.remove(req.user.id)
        .then(() => res.sendStatus(204))
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "There was an error", err})
        })
    }
});

module.exports = router;