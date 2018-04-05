const express = require('express');

const router = express.Router();

const postDb = require('../helpers/postDb.js');

router.get('/', (req, res) => {
    postDb.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    postDb.get(id)
    .then( response => {
        res.status(200).json(response);
    })
    .catch(error => {
        console.log('here');
        res.status(500).json({error: 'Post could not be retrieved.'});
    })
});

router.get('/:postId/tags', (req, res) => {
    const { postId } = req.params;
    postDb.getPostTags(postId)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.post('/', (req, res) => {
    const post = req.body;
    if (post.userId && post.text) {
        postDb.insert(post)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    } else {
        res.status(400).json({error: 'post must have a user id and text.'});
    }
});

router.put('/:id', (req, res) => {
    const post = req.body;
    const { id } = req.params;
    
    postDb.update(id, post)
    .then(response => {
        if (response === 1)
            res.status(200).json(id);
        else
            res.status(404).json({error: 'No post with that id.'})
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(id)
    .then(response => {
        if (response === 1)
            res.status(200).json(response);
        else
            res.status(404).json({error: 'No post with that Id.'});
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

module.exports = router;