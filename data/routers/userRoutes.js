const express = require('express');

const db = require('./helpers/userDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
    .find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ error: "Post could not be retrieved." })
    })
})

router.post('/', (req, res) => {
    const newUser = req.body;
    db
    .insert(newUser)
    .then(users => {
        res.status(201).json(users)
    })
    .catch(err => {
        res.status(500).json({ error: "Error saving post." })
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(404).json({ error: "Post ID doesn\'t exist." })
        }
        res.status(204).json.end();
    })
    .catch(err => {
        res.status(500).json({ error: "Post could not be removed." })
    })
})

module.exports = router;
