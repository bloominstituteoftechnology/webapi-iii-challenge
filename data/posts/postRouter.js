const express = require('express');
const router = express.Router();

router.get('/posts', (req, res) => {
    postDb.get()
    .then(posts => res.status(200).json(posts))
.catch(err => {
    res.status(500).json({ message: "Couldn't retrieve posts" })
})
})

router.get('/posts/:id', (req, res) => {
    postDb.get(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => {
        res.status(404).json({ message: 'there is no post by that ID'})
    })
})

router.post('/posts', (req, res) => {
    postDb.insert(req.body)
    .then(done => res.status(201).json(done))
    .catch(err => {
        res.status(400).json({ message: 'did not add new post'})
    })
})

router.put('/posts/:id', (req, res) => {
    postDb.update(req.params.id, req.body)
    .then(post => res.status(201).json(post))
    .catch(err => {
        res.status(400).json({ message: "failed to update the post" })
    })
})

router.delete('/posts/:id', (req, res) => {
    postDb.remove(req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err => {
        res.status(400).json({ message: "could not delete post"})
    })
})



module.exports = router;