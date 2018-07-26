const express = require('express');
const postDb = require('../helpers/postDb');
const router = express.Router();

// Posts
router.get('/', (req, res) => {
    postDb.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})
router.get('/:id', (req, res) => {
    postDb.get(req.params.id)
        .then (response => {
            // if (!response) {
            //     res.status(404).json({ message: "The post with the specified ID does not exist." })
            // }
            res.status(200).json(response);
        })
        .catch (err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})
router.post('/', (req, res) => {
    const { text, userId } = req.body;
    if (!text || !userId) {
        res.status(400).json({ errorMessage: "Please provide text and userId for the post." })
    }
    postDb.insert({ text, userId })
        .then(response => res.status(201).json({ text, userId }))
        .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database." }))
})
router.delete('/:id', (req, res) => {
    postDb.remove(req.params.id)
        .then(response => {
            if (!response) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json({ message: "The post has been deleted."})
            }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})
router.put('/:id', (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ errorMessage: "Please provide text for the post." })
    }
    postDb.update(req.params.id, { text })
        .then(response => {
            if (!response) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json({ text });
            }
        })
        .catch(err => res.status(500).json({ error: "The post could not be updated" }))
})
router.get('/tag/:id', (req, res) => {
    postDb.getPostTags(req.params.id)
        .then (response => {
            if(!response) {
                res.status(404).json({ message: "The post(s) with the specified ID does not exist." })
            } res.status(200).json(response);
        }) 
        .catch (err => res.status(500).json({ error: "The posts information could not be retrieved."}))
})

module.exports = router;