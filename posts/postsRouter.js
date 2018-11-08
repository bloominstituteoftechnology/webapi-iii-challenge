const express = require('express');

// database
const postDb = require('../data/helpers/postDb');

const router = express.Router();

// Get Posts
router.get('/', (req, res) => {
    postDb.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json({ message: 'error'})
        })
});

// Get post by id
router.get('/:id', (req, res) => {
    postDb.get()
        .then(posts => {
            const { id } = req.params;
            const post = posts.find(post => `${post.id}` === id);

            if (!post) {
                return res.status(404).json({ message: 'Post Not Found'})
            }

            postDb.get(id)
                .then(post => {
                    res.status(200).json(post)
                })
                .catch(error => {
                    res.status(500).json({message: 'error'})
                })
        })
        .catch(error => {
            res.status(500).json({message: 'error'})
        })
});

// Create new post
router.post('/', (req, res) => {
    const { userId, text } = req.body;

    postDb.insert({userId, text})
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(error => {
            res.status(500).json({ message: 'error to create post'})
        })
});

// Update post
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const text = req.body;
    console.log(text)

    postDb.update(id, text)
        .then(count => {
            if(count) {
                res.status(200).json({message: `${count} post updated`})
            } else {
                res.status(404).json({message: 'post ID does not exits'})
            }
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
});

// Delete post
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    postDb.remove(id)
        .then(count => {
            if (count) {
                res.status(200).json({message: `${count} post delete`})
            } else {
                res.status(404).json({message: 'post id does not exist'})
            }
        })
        .catch(error => {
            res.status(500).json({message: error})
        })
});

module.exports = router;