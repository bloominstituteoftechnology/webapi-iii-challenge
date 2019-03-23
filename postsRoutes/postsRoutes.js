const express = require('express');

const router = express.Router();

const postDb = require('../data/helpers/postDb');

router.get('/', (req, res) => {
    postDb.get()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => { res.status(500).json({ errorMessage: err }) })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    postDb.getById(id)
        .then(post => {
            post ? res.json(post) : res.status(404).json({ message: "This post ID does not exist." });
        })
        .catch(err => { res.status(500).json({ errorMessage: err }) });
})

router.post('/', (req, res) => {
    const newPost = req.body;
    if (newPost.text && newPost['user_id']) {
        postDb.insert(newPost)
            .then(post => {
                res.json(post);
            })
            .catch(err => { res.status(500).json({ errorMessage: err }) });
    } else {
        res.status(400).json({ message: "Please include post text and the user ID." });

    }
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const postChanges = req.body;

    if(postChanges.text || postChanges['user_id']){
        postDb.update(id, postChanges).then(countUpdated => {
            if(countUpdated){
                postDb.getById(id)
                .then(post => {
                    res.json(post);
                });
            }else{
                res.status(404).json({message: "This post ID does not exist."});
            }
        }).catch(err => {
            res.status(500).json({message: err})
        })
    }else{
        res.status(400).json({message: "Please include either text or user_id information for the post changes."});
    }
})

module.exports = router;