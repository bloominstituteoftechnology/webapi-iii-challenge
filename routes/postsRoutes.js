const express = require('express');
const router = express.Router();
const db = require('../data/helpers/postDb');

// ======================== GET endpoints 

router.get('/', (req, res) => {
    db.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(() => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
});


router.get('/:id', (req, res) => {
    const postId = req.params.id;
    db.getById(postId)
        .then(post => {
            if (post) {res.status(200).json(post)}
            else {res.status(404).json({message: "The post with the specified ID does not exist."})}
        })
        .catch(() => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
});


// ============  POST endpoint

router.post('/', (req, res) => {
    const post = req.body;
    if (!req.body.hasOwnProperty('text') || !req.body.hasOwnProperty('user_id')) {
        res.status(400).json({errorMessage: "Please provide text and user_id for the post."})
    }
    else {
        db.insert(post)
            .then(() => {res.status(201).json(post)})
            .catch(() => {res.status(500).json({error: "There was an error while saving the post to the database"})})
    }
});


// ============  DELETE endpoint

router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    db.getById(postId)
        .then(post => {
            db.remove(postId)
                .then(deletion => {
                    if (!deletion) {
                        res.status(404).json({ message: "The post with the specified ID does not exist."})
                    }
                    else {
                        res.status(200).json({post})
                    }
                })
                .catch(() => {
                    res.status(500).json({error: "The post could not be removed"})
                })
        })
        .catch(() => {
            res.status(500).json({error: "workaround didn't work"})
        })
});

// ============  PUT endpoint

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const postUpdate = req.body;

    db.update(id, postUpdate)
        .then(postMatch => {
            if (!postMatch) {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
            else if (!postUpdate.text || !postUpdate.user_id) {
                res.status(400).json({ errorMessage: "Please provide text and user_id for the post." })
            }
            else {
                res.status(200).json(postUpdate)
            }
        })
        .catch(() => {
            res.status(500).json({error: "The post information could not be modified."})
        })
});


module.exports = router;