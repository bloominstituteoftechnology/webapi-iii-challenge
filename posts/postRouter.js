const express = require('express');

const Posts = require("./postDb");

const router = express.Router();

router.get('/', (req, res) => {
    Posts.get()
    .then(posts => res.status(200).json(posts))
    .catch( err => res.status(500).json({ error: "Failed to retrieve all posts." }))
    
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Posts.getById(id)
    .then(post => {
        post
        ? res.status(200).json(post)
        : res.status(404).json({ message: `Could not find a post with an ID of ${id}.` })
    })
    .catch(err => res.status(500).json({ error: `Failed to retrieve post with ID of ${id}.` }))
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Posts.remove(id)
    .then(deleted => {
        deleted > 0
        ? res.status(200).json(deleted)
        : res.status(404).json({ message: `Could not find a post with an ID of ${id}.` })
    })
    .catch(err => res.status(500).json({ error: `Failed to remove post with ID of ${id}.` }))
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedInfo = req.body;

    if (!updatedInfo.text) res.status(400).json({ errorMessage: "Please provide a text property in the object." })

    Posts.update(id, updatedInfo)
    .then(updated => {
        if (updated) {
            Posts.getById(id)
            .then(post => res.status(200).json(post))
        } else res.status(404).json({ message: `Could not find a post with an ID of ${id}.` })
    })
    .catch(err => res.status(500).json({ error: `Failed to retrieve a post with ID of ${id}.` }))
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;