const express = require('express');

const router = express.Router();

const userDb = require('../data/helpers/userDb.js');

const caps = (req, res, next) => {
    console.log(req.body);
   req.body.name = req.body.name.toUpperCase();
   next();
}

router.get('/', (req, res) => {
    userDb.get()
    .then(users => {
        console.log('***USERS***', users);
        res.status(200).json(users);
    })
    .catch(() => res.status(404).json({ error: "The users could not be retrieved."}));
});

router.post('/', caps, (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    userDb.insert(newUser)
        .then(userId => {
            const { id } = userId;
            userDb.get(id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: "The user with the specified ID does not exist." });
                } else
                return res.status(201).json(user);
            })
            .catch(() => res.status(500).json({ error: "There was an error while saving the user."}));
        })
        .catch(() => res.status(400).json({ error: "Please provide a name for the user" }));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    userDb.getUserPosts(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(() => res.status(500).json({ error: "The user's posts could not be retrieved."}))
    });

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    userDb.remove(id)
    .then(removedUser => {
        console.log(removedUser);
        if (removedUser === 0) {
            return res.status(404).json({ message: "The user with the specified ID does not exist"})
        } else
        return res.status(200).json(removedUser);
    })
    .catch(() => res.status(500).json({ error: "The user could not be removed" }));
});

router.put('/:id', caps, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const newUser = { name };
    userDb.update(id, newUser)
    .then(user => {
        console.log('user = ', user);
        res.status(200).json(user);
    })
    .catch(() => res.status(500).json({ error: "The user information could not be modified."}));
});

module.exports = router;