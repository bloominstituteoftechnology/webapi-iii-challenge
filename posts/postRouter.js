const express = require('express');

const router = express.Router();

const postDb = require('../data/helpers/postDb.js');


router.get('/', (req, res) => {
    postDb.get()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

router.get('/:id/tags', (req, res) => {
    const { id } = req.params;

    postDb.getPostTags(id)
    .then(tags => res.status(200).json(tags))
    .catch(error => res.status(500).json(error));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    postDb.get(id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json(error));
});

router.post('/', (req, res) => {
    const post = req.body;

    postDb.insert(post)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatePost = { ...req.body, id};

    postDb.update(id, updatePost)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json(error));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    postDb.remove(id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json(error));
});


module.exports = router;
