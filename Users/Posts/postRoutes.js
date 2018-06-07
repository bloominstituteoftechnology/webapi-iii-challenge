// Import Node Modules
const express = require('express');
const db = require('../data/helpers/postDb');
const router = express.Router();

// GET Post
router.get ('/', (req, res) => {
    db
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    // Retrieval Error From Database
    .catch(err => {
        res.status(500).json({ error: 'The info could not be retrieved.' })
    });
});

// GET Post by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
    .get(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ message: 'The specified ID does not exist.' })
        } else {
            res.json(posts);
        }
    })
    // Retrieval Error From Database
    .catch(err => {
        res.status(500).json({ error: 'The info could not be retrieved.' })
    });
});

// GET post by id/posts
router.get('/:id/posts', (req, res) => {
    const id = req.params.id;
    db
    .getPostTags(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ message: 'The specified ID does not exist.' })
        } else {
            res.json(posts);
        }
    })
    // Retrieval Error From Database
    .catch(err => {
        res.status(500).json({ error: 'The info could not be retrieved.' })
    });
});

// POST 
router.post('/', (req, res) => {
    const {text, userId} = req.body;
    const newPost = {text, userId};
        if (req.body.length === 0) {
            res.status(404).json({ message: 'The specified userID does not exist.' })
        } else
        db
        .insert(newPost)
        .then(post => {
            res.status(201).json(post);
        })
        // Retrieval Error From Database
        .catch(err => {
            res.status(500).json({ error: 'Error saving the post.' })
        });
    });

// DELETE
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: 'The specified ID does not exist.' })
    } else
    db.remove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    // Retrieval Error From Database
    .catch(err => {
        res.status(500).json({ error: 'Post could not be removed.' })
    });
});

// PUT
router.put('/:id', (req, res) => {
    const {text, userId} = req.body;
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: 'The specified ID does not exist.' })
    }
    if (req.body.length === 0) {
        res.status(400).json({ errorMessage: 'Please provide text and userID for the post.' })
    } else
    db.update(id, req.body)
    .then(improve => {
        res.status(200).json(improve);
    })
    // Retrieval Error From Database
    .catch(err => {
        res.status(500).json({ error: 'The post information could not be modified.' })
    });
});

// Module Export
module.exports = router;