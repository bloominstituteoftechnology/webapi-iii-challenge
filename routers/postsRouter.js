const express = require('express');
const postDb = require('../data/helpers/postDb.js');

const router = express.Router();

// ***** GET post by post id *****
// Post exists --> respond post by id
// Post doesn't exist --> error
router.get('/:id', (req, res) => {
    postDb.get(req.params.id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: `The post with id ${req.params.id} could not be retrieved. This may be due to the post not existing.` })
        })
});

// ***** GET tags for post by post id *****
// Post exists --> respond tags for post by post id
// Post doesn't exist --> error
router.get('/:id/tags', (req, res) => {
    postDb.get(req.params.id)
        .then(tags => {
            res.status(200).json(tags);
        })
        .catch(err => {
            res.status(500).json({ error: `The tags for the post with id ${req.params.id} could not be retrieved. This may be due to the post not existing.` })
        });
});

// ***** POST new post *****
router.post('/new-post', (req, res) => {
    //check user exists
    postDb.insert(req.body)
        .then(id => {
            return postDb.get(id.id);
        })
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to create new post.' })
        })
})

module.exports = router;