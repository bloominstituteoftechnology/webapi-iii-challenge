const express = require('express');
const router = express.Router();
const userDb = require('../data/helpers/userDb');
const middleware = require('../middleware/uppercaseName');

router.use(middleware.uppercaseUserName)

router.delete('/:id', (req, res) => {
    userDb.remove(req.params.id)
        .then(count => {
            if (count) {
                res.json({message: `Successfully deleted the user with ID: ${req.params.id}`})
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be removed"});
        })
});

router.get('/', (req, res) => {
    userDb.get()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500).json({error: "The users information could not be retrieved."});
        });
});

router.get('/:id', (req, res) => {
    userDb.get(req.params.id)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(500).json({error: "The user information could not be retrieved."});
        });
});

router.post('/', (req, res) => {
    const user = req.body;
    if (user.name) {
        userDb.insert(user)
            .then(idObject => {
                userDb.get(idObject.id)
                    .then(user => {
                        res.status(201).json(user);
                    })
            })
            .catch(err => {
                res.status(500).json({error: "There was an error while saving the user to the database"});
            });
    } else {
        res.status(400).json({errorMessage: "Please provide 'name' for the user."});
    }
});

router.put('/:id', (req, res) => {
    const user = req.body;
    if (user.name) {
        userDb.update(req.params.id, user)
            .then(count => {
                if (count) {
                    userDb.get(req.params.id)
                        .then(user => {
                            res.json(user);
                        })
                } else {
                    res.status(404).json({message: "The user with the specified ID does not exist."});
                }
            })
            .catch(err => {
                res.status(500).json({error: "The user information could not be modified."});
            });
    } else {
        res.status(400).json({errorMessage: "Please provide 'name' for the user."});
    }
});

router.get('/:id/posts', (req, res) => {
    userDb.get(req.params.id)
        .then((user) => {
            if (user) {
                userDb.getUserPosts(req.params.id)
                    .then((posts) => {
                        res.json(posts);
                    })
                    .catch((err) => {
                        res.status(500).json({error: `The posts information could not be retrieved for userid ${req.params.id}.`});
                    });
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
        })
        .catch((err) => {
            res.status(500).json({error: "The user information could not be retrieved."});
        });
});

module.exports = router;