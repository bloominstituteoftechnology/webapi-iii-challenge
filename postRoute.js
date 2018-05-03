const express = require('express');
const postDb = require('./data/helpers/postDb');

// add middleware
const router = express.Router();

// --------POST--------

// GET method for post
router.get('/', (req, res) => {

    postDb
    .get()
    .then(response => {
       res.status(200).json({ response });
   })
   .catch(err => {
       res.status(500).json({ Error: err });
   })
})

// POST method for post
router.post('/', (req, res) => {
    const postInfo = req.body;

    postDb
    .insert(postInfo)
    .then(response => {
        res.status(201).json({ postInfo })
    })
    .catch( err => {
        res.status(500).json({ Error: err })
        }
    )
})

// DELETE method for post
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    postDb
    .remove(id)
    .then(response => {
        res.status(200).json(`${response} post deleted`)
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

// PUT method for post
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;

    postDb
    .update(id, post)
    .then(response => {
        res.status(200).json({ post })
    .catch(err => {
        res.status(500).json({ Error: err })
        })
    })
})

// Retrieve List of Tags for a Post
router.get('/:id', (req, res) => {
    const id = req.params.id;

    postDb
    .getPostTags(id)
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(error => {
        res.status(500).json({ Error: err })
    })
})

module.exports = router;