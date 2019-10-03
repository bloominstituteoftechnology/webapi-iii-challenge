const express = require('express');

const router = express.Router();

const Posts = require('./postDb');

const validatePost = require('../middleware/validation/posts/validatePost');

const validatePostId = require('../middleware/validation/posts/validatePostId');

// CREATE
router.post('/', validatePost, (req, res) => {
    Posts.insert(req.body)
    .then(item => {
        res.status(201).json(item)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "There was an error", err})
    })
});

// READ
router.get('/', (req, res) => {
    Posts.get()
    .then(list => {
        res.status(200).json(list)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "There was an error", err})
    })
});

router.get('/:id', validatePostId, (req, res) => {
    res.status(200).json(req.post);
});

// UPDATE
router.put('/:id', validatePostId, validatePost, (req, res) => {
    Posts.update(req.post.id, req.body)
    .then(item => {
        const changes = req.body
        res.status(200).json({updateSuccess: true, changes})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "There was an error", err})
    })
});

// DELETE
router.delete('/:id', validatePostId, (req, res) => {
    if (!req.post) {
        res.status(400).json({errorMessage: "Please provide an ID"})
    } else {
        Posts.remove(req.post.id)
        .then(() => res.sendStatus(204))
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "There was an error", err})
        })
    }
});

module.exports = router;