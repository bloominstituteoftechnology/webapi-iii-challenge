const express = require('express');
const posts = require('../data/helpers/postDb');
const router = express.Router();

router.post('/', (req, res) => {
    const newPost = req.body;
    if (!newPost.title || !newPost.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    posts
        .insert(newPost)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        });
});

router.get('/', (req, res) => {
    posts
        .get()
        .then(posts => {
            res.status(200).json({posts});
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        });
});

router.get('/:id', (req, res) => {
    postId = req.params.id
    posts
     .getById(postId)
     .then(post => {
         if (post.length === 0) {
             res.status(404).json({ message: "The post with the specified ID does not exist." });
             return;
         }
         res.status(200).json(post);
     })
     .catch(err => {
         res.status(500).json({ error: "The post information could not be retrieved." })
     });
});

router.delete('/:id', (req, res) => {
    const postId = req.params.id
    posts
        .remove(postId)
        .then(postId => {
            if (postId === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
                return;
            }
            res.status(200).json(postId);
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" })
        });
});

router.put('/:id', (req, res) => {
    const updateId = req.params.id
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    posts
        .update(updateId, req.body)
        .then(post => {
            if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
                return;
            }
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
        });
});

module.exports = router;