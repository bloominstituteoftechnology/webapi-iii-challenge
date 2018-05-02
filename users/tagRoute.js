const express = require("express");
const db = require('../data/helpers/tagDb');
const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    });
});

router.get('/:id', (req, res) => {
    db
    .get(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({  message: 'The post with the specified ID does not exist.'})
        } else {
            res.json(posts[0]);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    });
});

router.post('/', (req, res) => {
    const {tag} = req.body;
    const newPost = {tag};
        if (req.body.length === 0) {
            res.status(404).json({ message: "The post with the specified userID does not exist."})
        } else 
        db
        .insert(newTag)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error saving the post to the database."})
        });
});





















module.exports = router;