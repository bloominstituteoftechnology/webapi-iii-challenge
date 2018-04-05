const express = require('express');

const router = express.Router();

const db = require('../helpers/userDb.js');

router.get('/', (req, res) => {
    db
    .get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});


router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    db
    .getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db
    .get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.post('/', function(req, res) {
    const users = req.body;
    db
    .insert(users)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({ error: 'No post addded.'});
    });
});


module.exports = router;