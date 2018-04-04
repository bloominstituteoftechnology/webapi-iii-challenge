const express = require('express');

const router = express.Router();

const postDb = require('../helpers/postDb.js');

router.get('/', (req, res) => {
    postDb.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    postDb.get(id)
    .then( response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.get('/tags/:postId', (req, res) => {
    const { postId } = req.params;
    postDb.getPostTags(postId)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.post('/', (req, res) => {
    const post = req.body;
    postDb.insert(post)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.put('/:id', (req, res) => {
    const post = req.body;
    const { id } = req.params;
    postDb.update(id, post)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});


module.exports = router;