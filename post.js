const express = require('express');
const postDb = require('./data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res) => {
    postDb.get()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load posts' })
        })
})

router.get('/:id', (req, res) => {

    const { id } = req.params;

    postDb.get(id)
        .then(post => {
            if (post) {
                res.json(post)
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load post' })
        })
})

router.post('/', (req, res) => {

    const post = req.body;

    if (post.userId && post.text) {
        postDb.insert(post)
            .then(idInfo => {
                postDb.get(idInfo.id).then(post => {
                    res.status(201).json(post);
                })
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to insert post' })
            })
    } else {
        res.status(400).json({ message: 'Missing user ID or text' })
    }
})

router.delete('/:id', (req, res) => {

    const { id } = req.params;
    const post = req.body;

    postDb.remove(id)
        .then(count => {
            if (count) {
                res.json(post)
            } else {
                res.status(404).json({ message: 'Post with specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete post' })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (post.userId && post.text) {
        postDb.update(id, post)
            .then(post => {
                if (id) {
                    res.json({ message: 'Post has been updated' })
                } else {
                    res.status(404).json({ message: 'Post with specified ID does not exist' })
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to update post' })
            })
    } else {
        res.status(400).json({ message: 'Missing user ID or text' })
    }
})

module.exports = router;