const express = require('express');

const db = require('./helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
    .find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ error: "Post could not be retrieved." })
    })
})

router.post('/', (req, res) => {
    const newPost = req.body;
    db
    .insert(newPost)
    .then(posts => {
        res.status(201).json(posts)
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
