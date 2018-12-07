/* node_module requires */
const express = require('express');

/* Local requires */
const userDB = require('../data/helpers/userDb');

/* Global constants */
const router = express.Router();

/* User CRUD Functions */
router.get('/', (req, res) => {
    userDB.get()
    .then(users => {
        res.json(users);
    })
    .catch(() => {
        res.status(500).json({errorMessage: 'Server error getting users'});
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    userDB.get(id)
    .then((user) => {
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({errorMessage: 'User does not exist'});
        }
    })
    .catch(() => {
        res.status(500).json({errorMessage: 'Server error getting user by id'});
    })
})

router.get('/:id/posts', (req, res) => {
    const {id} = req.params;
    userDB.getUserPosts(id)
    .then((posts => {
        res.status(200).json(posts);
    }))
    .catch((error) => {
        res.status(500).json({errorMessage: error});
    })
})

router.post('/', (req, res) => {
    const user = req.body;
    if (user.name) {
        userDB.insert(user)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(() => {
            res.status(500).json({errorMessage: 'Server error adding user'});
        })
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const userToUpdate = req.body;
    if(userToUpdate.name) {
        userDB.get(id)
        .then((user) => {
            if (user) {
                userDB.update(id, userToUpdate)
                .then(data => {
                    res.json(data);
                })
                .catch(() => {
                    res.status(500).json({errorMessage: 'Server error updating user'});
                })
            }
            else {
                res.status(404).json({errorMessage: 'User does not exist'});
            }
        })
        .catch(() => {
            res.status(500).json({errorMessage: 'Server error getting user by id'});
        })
    }
    else {
        res.status(400).json({message: `User must contain a 'name' field.`});
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    userDB.get(id)
    .then((user) => {
        if (user) {
            userDB.remove(id)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(() => {
                res.status(500).json({errorMessage: 'Server error deleting user.'});
            })
        }
        else {
            res.status(404).json({errorMessage: 'User does not exist.'});
        }
    })
    .catch(() => {
        res.status(500).json({errorMessage: 'Server error getting user by id'});
    })
})

module.exports = router;