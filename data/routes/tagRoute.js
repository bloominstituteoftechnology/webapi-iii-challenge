const express = require('express');
const tagDb = require('../helpers/tagDb');
const router = express.Router();

// Custom Middleware
function upperCaseTag(req, res, next) {
    if (req.method === 'GET' && req.url === '/') {
        let tags = res.json;
        res.json = function (data) {
            data.forEach(response => response.tag = response.tag.toUpperCase());
            tags.apply(res, arguments);
        }
    }
    next();
}
router.use(upperCaseTag);

// Tags
router.get('/', (req, res) => {
    tagDb.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The tags information could not be retrieved." }))
})
router.get('/:id', (req, res) => {
    tagDb.get(Number(req.params.id))
        .then (response => {
            if (!response) {
                res.status(404).json({ message: "The tag with the specified ID does not exist." })
            } res.status(200).json(response);
        })
        .catch (err => res.status(500).json({ error: "The tags information could not be retrieved." }))
})
router.post('/', (req, res) => {
    const { tag } = req.body;
    if (!tag) {
        res.status(400).json({ errorMessage: "Please provide tag for the post." })
    }
    tagDb.insert({ tag })
        .then(response => res.status(201).json({ tag }))
        .catch(err => res.status(500).json({ error: "There was an error while saving the tag to the database." }))
})
router.delete('/:id', (req, res) => {
    tagDb.remove(req.params.id)
        .then(response => {
            if (!response) {
                res.status(404).json({ message: "The tag with the specified ID does not exist." })
            } else {
                res.status(200).json({ message: "The tag has been deleted."})
            }
        })
        .catch(err => res.status(500).json({ error: "The tag could not be removed" }))
})
router.put('/:id', (req, res) => {
    const { tag } = req.body;
    if (!tag) {
        res.status(400).json({ errorMessage: "Please provide text for the tag." })
    }
    tagDb.update(req.params.id, { tag })
        .then(response => {
            if (!response) {
                res.status(404).json({ message: "The tag with the specified ID does not exist." })
            } else {
                res.status(200).json({ tag });
            }
        })
        .catch(err => res.status(500).json({ error: "The tag could not be updated" }))
})

module.exports = router;