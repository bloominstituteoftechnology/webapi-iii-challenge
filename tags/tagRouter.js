const express = require('express');

const router = express.Router();

const tagDb = require('../data/helpers/tagDb');


router.get('/', (req, res) => {
    tagDb.get()
    .then(tags => res.status(200).json(tags))
    .catch(error => res.status(500).json(error));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    tagDb.get(id)
    .then(tags => res.status(200).json(tags))
    .catch(error => res.status(500).json(error));
});

router.post('/', (req, res) => {
    const tag = req.body;

    tagDb.insert(tag)
    .then(tags => res.status(200).json(tags))
    .catch(error => res.status(500).json(error));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updateTag = req.body;

    if (!updateTag) {
    return res.status(400).json({error: "Enter something unique under 80 characters long."})
  }

    tagDb.update(id, updateTag)
    .then(tag => res.status(200).json(tag))
    .catch(error => res.status(500).json(error));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    tagDb.remove(id)
    .then(tag => res.status(200).json(tag))
    .catch(error => res.status(500).json(error));
});


module.exports = router;
