const express = require('express');

const db = require('../data/helpers/userDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ error: "User could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
    db
    .getById(id)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(404).json({ error: "The user with the specified ID does not exist." })
    });
});


router.post('/', (req, res) => {
    const newUser = req.body;
    db
    .insert(newUser)
    .then(users => {
        res.status(201).json(users)
    })
    .catch(err => {
        res.status(500).json({ error: "Error saving user." })
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(404).json({ error: "User ID doesn\'t exist." })
        }
        res.status(204).json.end();
    })
    .catch(err => {
        res.status(500).json({ error: "User could not be removed." })
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const user = req.body;

    if(!user.name) 
        return res.status(400).json({ error: "Please provide name for the user. "})
        .end();

    db
    .update(id, user)
    .then(user => {
        // check if exist 
        if(!user) 
            return res.status(404).json({ error: "The user with the specified ID doesn't exist" });
            return res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be modified."  })
    })
})

module.exports = router;
