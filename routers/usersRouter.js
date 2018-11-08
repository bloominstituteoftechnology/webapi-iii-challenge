const express = require('express');
const userDb = require('../data/helpers/userDb.js');

const uppercaseMiddleware = require('../middleware/uppercaseMiddleware.js');

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
router.post('/create-new', uppercaseMiddleware, (req, res) => {
    if (req.body.name && (req.body.name.length < 128)) {
        userDb.insert(req.body)
            .then(id => {
                return userDb.get(id.id);
            })
            .then(user => {
                if (user) {
                    res.status(201).json(user);
                } else {
                    res.status(404).json({ error: `Error retrieving new user.` })
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Error in user creation.' })
            })
    } else {
        res.status(400).json({ error: 'Name must be between 1 and 128 characters long.' })
    }
});

// ***** DELETE user by user id *****
// user at id does not exist --> error
// user successfully deleted --> respond success message
router.delete('/:id', (req, res) => {
    userDb.get(req.params.id)
        .then(user => {
            if (user) {
                return userDb.remove(req.params.id);
            } else {
                res.status(404).json({ error: `The user with id ${req.params.id} does not exist.` })
            }
        })
        .then(recordsDeleted => {
            if (recordsDeleted) {
                res.status(200).json({ message: `User successfully deleted.` })
            } else {
                res.status(500).json({ error: `Failed to delete the user with id ${req.params.id}` })
            }
        })
        .catch(err => {
            res.status(500).json({ error: `Failed to delete the user with id ${req.params.id}.` })
        });
})

// ***** PUT update user by user id *****
router.put('/:id', uppercaseMiddleware, (req, res) => {
    if (req.body.name) {
        userDb.get(req.params.id)
            .then(user => {
                if (user) {
                    return userDb.update(req.params.id, req.body);
                } else {
                    return res.status(404).json({ error: `The user with id ${req.params.id} does not exist.` });
                }
            })
            .then(recordsUpdated => {
                if (recordsUpdated) {
                    return userDb.get(req.params.id);
                } else {
                    return res.status(500).json({ error: `Failed to update the user with id ${req.params.id}.` });
                }
            })
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ error: `The user with id ${req.params.id} does not exist.` });
                }
            })
            .catch(err => {
                res.status(500).json({ error: `Failed to update the user with id ${req.params.id}.` });
            })
    } else {
        res.status(400).json({ error: 'Name must be between 1 and 128 characters long.' });
    }
});

module.exports = router;