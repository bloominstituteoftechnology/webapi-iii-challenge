const express = require('express');
const router = express.Router();
const userDb = require('../data/helpers/userDb');

// custom middleware 
const uppercase = require('../config/uppercase');

// ALL USER RELATED STUFF -----------------------------------------------------------------------------------------------------------
router.get('/', (req, res) => {
    userDb.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({error: "The users information could not be retrieved."})
    })
})

router.get('/:id', (req,res) => {
    const id = req.params.id;
    userDb.get(id)
        .then(user => {
            if (user) {
                userDb.getUserPosts(id).then(posts => {
                    res.status(200).json({user: user, posts: posts});
                }).catch(err => {
                    res.status(500).json({error: "The user and posts could not be retrieved."})
                })
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user information could not be retrieved."});
        })
});

router.post('/', uppercase, (req,res) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).json({message: "Please provide a name for the user"});
    } else {
        userDb.insert(req.body).then(user => {
            userDb.get(user.id)
                .then(user => res.status(201).json(user))
                .catch(err => res.status(404).json({message: "The user with the specified ID does not exist."}));
        }).catch(err => {
            res.status(500).json({message: "There was an error while saving the user to the database", err})
        })
    }
})

router.delete('/:id', (req,res) => {
    userDb.remove(req.params.id).then(count => {
        if (count) {
            res.status(200).json(count);
        }
        else {
            res.status(404).json({message: "The user with the specified ID does not exist."});
        }
    }).catch(err => {
        res.status(500).json({error: "The user could not be removed"});
    })
})

router.put('/:id', uppercase, (req,res) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).json({message: "Please provide a name for the user"});
    } else {
        userDb.update(req.params.id, req.body).then(count => {
            if (count) {
                userDb.get(req.params.id)
                    .then(user => res.status(200).json(user))
                    .catch(err => res.status(404).json({message:"The user with the specified ID does not exist."}));
            }
            else {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
        }).catch(err => {
            res.status(500).json({message: "There was an error while saving the user to the database", err})
        })
    }
})

module.exports = router;