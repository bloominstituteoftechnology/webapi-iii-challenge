const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js');


router.get('/', (req, res) => {
    db.get()
    .then(tags => res.status(200).json(tags))
    .catch(error => res.status(500).json(error));
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.get(id)
    .then(tags => res.status(200).json(tags))
    .catch(error => res.status(500).json(error));
})

router.post('/', (req, res) => {
    const tag = req.body;

    db.insert(tag)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedTag = { ...req.body, id};

    db.update(id, updatedTag)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
})

module.exports = router;