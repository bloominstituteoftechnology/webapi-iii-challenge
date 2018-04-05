const express = require('express');

const router = express.Router();

const tagDb = require('../data/helpers/tagDb')
const postDb = require('../data/helpers/postDb')
const userDb = require('../data/helpers/userDb')

router.get('/', (req, res) => {
    tagDb
    .get()
    .then(tags => {
        res.status(200).json(tags);
    })
    .catch(error => {
        res.status(500).json({error: 'Tags dont exist.'})
    })
})

router.get('/:postId', (req, res) => {
    const { postId } = req.params;

 

    postDb
    .getPostTags(postId)
    .then(tags => {
        res.status(200).json(tags);
    })
    .catch(error => {
        res.status(500).json({error: 'That post has no tags.'})
    })
})

router.post('/:postId', (req, res) => {
    const { postId } = req.params;
    const { tag } = req.body;

    const newTag = { postId, tag }
    tagDb
    .insert(newTag)
    .then(newt => {
        res.status(201).json(newt);
    })
    .catch(error => {
        res.status(500).json({error: 'There was an error creating the tag.'})
    })


})


module.exports = router;