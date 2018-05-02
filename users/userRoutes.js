const express = require('express');

const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');
const tagDb = require('../data/helpers/tagDb');

const router = express.Router();

router.get('/', (req, res, next) => {
    userDb.get()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    userDb.get(id)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    userDb.remove(id)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
})

router.post('/', (req, res, next) => {
    const userInfo = req.body;

    userDb.insert(userInfo)
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

    userDb.update(id, update)
        .then(response => {
            userDb.get()
                .then(users => {
                    res.json(users);
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
})

module.exports = router;