const express = require('express');

const tagDb = require('../data/helpers/tagDb');

const router = express.Router();

router.get('/', (req, res, next) => {
    tagDb
        .get()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    tagDb
        .get(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    const tagInfo = req.body;

    tagDb
        .insert(tagInfo)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const update = req.body;

    tagDb
        .update(id, update)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    tagDb
        .remove(id)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;
