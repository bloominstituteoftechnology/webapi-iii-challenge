const express = require('express');

const postDb = require('../data/helpers/postDb');

const router = express.Router();

//get all post
router.get('/', (req, res) => {
    postDb
        .get()
        .then((response) => res.status(200).send(response))
        .catch(() => res.status(500).send({ error: 'Error fetching posts' }))
});

//get post by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    postDb
        .get(id)
        .then((response) => response.length === 0
            ? res.status(200).send({error: `Post not found`})
            : res.status(200).send(response))
        .catch(() => res.status(500).send({ error: 'Error fetching post' }))
});

module.exports = router;