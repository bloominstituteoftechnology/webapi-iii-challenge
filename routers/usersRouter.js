const express = require('express');
const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

// ***** GET user by user id *****
// User exists --> respond user object
// User doesn't exist --> error
router.get('/:id', (req, res) => {
    userDb.get(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: `The user with id ${req.params.id} does not exist.` })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The user information could not be retrieved.' })
        })
});

// ***** GET posts by user id *****
// User exists --> respond posts for user id
// User doesn't exist --> error
router.get('/:id/posts', (req, res) => {
    userDb.get(req.params.id)
        .then(user => {
            if (user) {
                return userDb.getUserPosts(req.params.id);
            } else {
                res.status(404).json({ error: `The user with id ${req.params.id} does not exist.` })
            }
        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: `The posts for user ${req.params.id} could not be retrieved.` })
        });
});

// ***** POST new user *****
// after user created, find by id --> responds with new user object
// name is empty or greater than 128 characters --> error
// after user inserted, cannot find by user id --> error
router.post('/create-new', (req, res) => {
    if (req.body.name && (req.body.name.split().length > 128)) {
        userDb.insert(req.body)
            .then(id => {
                return userDb.get(id.id);
            })
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ error: `User not found, error in user creation.` })
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Error in user creation.' })
            })
    } else {
        res.status(400).json({ error: 'Name must be between 1 and 128 characters long.'})
    }
});

module.exports = router;