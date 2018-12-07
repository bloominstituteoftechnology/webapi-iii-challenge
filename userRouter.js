//dependencies 

const userDb = require('./data/helpers/userDb.js');
const express = require('express');

//define router

const router = express.Router();

// respond with full array of users

router.get('/', (req, res) => {
    userDb.get()
        .then(users => {
            res
                .json(users);
        })
        .catch(err => {
            res
                .status(500)
                .json({message: `The users' information could not be retrieved.`});
        })
})

//respond with individual user

router.get('/:id', (req, res) => {
    const { id } = req.params;
    userDb.get(id)
        .then(user => {
            if (user) {
                res
                    .json(user);
            }
            else {
                res
                    .status(404)
                    .json({message: 'The user with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'The user information could not be retrieved.'});
        });
});

//insert new user into user database

router.post('/', (req, res) => {
    const newUser = req.body;
    if (newUser.name) {
        userDb.insert(newUser)
            .then(idInfo => {
                userDb.get(idInfo.id)
                    .then(user => {
                        res
                            .status(201)
                            .json(user);
                    });
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'There was an error saving the new user.'})
            });
    }
    else {
        res
            .status(400)
            .json({message: 'Please provide the name of the new user.'})
    }
});

//remove user from user database

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    userDb.remove(id)
        .then(count => {
            if (count) {
                res.json({message: 'The user was deleted.'});
            }
            else {
                res
                    .status(404)
                    .json({message: 'The user with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'The user could not be removed.'});
        });
});

//update existing user

router.put('/:id', (req, res) => {
    const updatedUser = req.body;
    const { id } = req.params;
    if (updatedUser) {
        userDb.update(id, updatedUser)
            .then(count => {
                if (count) {
                    res.json({message: 'The user was updated.'});
                }
                else {
                    res
                        .status(404)
                        .json({message: 'The user with the specified ID does not exist.'});
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'The user information could not be updated.'});
            });
    }
    else {
        res
            .status(400)
            .json({message: `Please provide the user's updated name.`});
    }
});

// get posts by user ID

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    userDb.getUserPosts(id)
        .then(posts => {
            if (posts.length > 0) {
                res
                    .json(posts);
            }
            else {
                res
                    .status(404)
                    .json({message: 'The user with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: `The user's posts could not be retrieved.`});
        });
});

module.exports = router;