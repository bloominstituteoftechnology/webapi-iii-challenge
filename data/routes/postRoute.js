const express = require('express');
const router = express.Router();
const postDb = require('../helpers/postDb');
router.get('/', (req, res) => {
    postDb
        .get()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ error: 'the posts information could not be retrieved.' }))
})
router.get('/:id', (req, res) => {
    const id = req.params.id;
    postDb
        .get(id)
        .then(post => res.status(200).json(post))
        .catch(err => res.status(500).json({ error: 'the post information could not be retrieved.' }))
})
router.post('/', (req, res) => {
    const postData = req.body;
    postDb
        .insert(postData)
        .then(postId => res.status(201).json(postId))
        .catch(err => res.status(500).json({ message: 'there was an error adding the post' }))
})
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    postDb
        .remove(id)
        .then(count => res.status(200).json(count))
        .catch(err => res.status(500).json({ message: 'there was an error deleting the post' }))
})
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const postUpdate = req.body;
    postDb
        .update(id, postUpdate)
        .then(count => res.status(201).json(count))
        .catch(err => res.status(400).json({ message: 'could not update post' }))
})
module.exports = router;