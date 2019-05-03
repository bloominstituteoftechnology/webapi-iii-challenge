const express = require('express');

const db = require('../data/helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ error: "Post could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
    db
    .getById(id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(404).json({ error: "The user with the specified ID does not exist." })
    });
});


router.post('/', (req, res) => {
    const newPost = req.body;
    db
    .insert(newPost)
    .then(posts => {
        res.status(201).json(posts)
    })
    .catch(err => {
        res.status(500).json({ error: "Error saving post." })
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(404).json({ error: "Post ID doesn\'t exist." })
        }
        res.status(204).json.end();
    })
    .catch(err => {
        res.status(500).json({ error: "Post could not be removed." })
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const post = req.body;

    if(!post.text) 
        return res.status(400).json({ error: "Not the text we're looking for. "})
        .end();

    db
    .update(id, post)
    .then(post => {
        // check if exist 
        if(!post) 
            return res.status(404).json({ error: "The post with the specified ID doesn't exist" });
            return res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be modified."  })
    })
})

module.exports = router;
