const express = require('express');
const post = require('../../data/helpers/postDb');
const router = express.Router();

router.get('/', (req, res) => {
    post.get()
    .then(foundPosts => {
        res.json(foundPosts)
    })
    .catch(err => {
        res.status(500).json({ message: err })
    });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    post.get(id)
    .then(foundPost => {
        res.json(foundPost)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
router.post('/', (req, res) => {
    const { userId, text } = req.body;
    post.insert({ userId, text })
    .then(newPost => {
        res.json(newPost)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const postText = req.body;
    post.update(id, postText)
    .then(count => {
        res.json(count)
    })
    .catch(err => {
        res.json({ message: err })
    })
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    post.remove(id)
    .then(count => {
        res.json(count)
    })
    .catch( err => {
        res.json({ message: err })
    })
});

module.exports = router;