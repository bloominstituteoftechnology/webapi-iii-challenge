const express = require('express');
const postDB = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res) => {
    postDB.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "Unable to retrieve posts." })
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    postDB.getPostTags(id)
    .then(tags => {
        res.status(200).json(tags);
    })
    .catch(err => {
        res.status(500).json({ error: "Unable to retrieve post tags." })
    })
});

router.post('/', (req, res) => {
    const post = req.body;
    if (post.text && post.userId){
    postDB.insert(post)
    .then(
        postDB.get()
        .then(posts => {
            res.status(200).json(posts)
        })
    )
    .catch(err => {
        res.status(500).json({ error: "Failed to add post."})
    })
    } else {
        res.status(400).json({ error: "Please provide post text and user ID."})
    }
});

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    postDB.remove(id)
    .then(resolution => {
        res.json({ message: "Post Successfully Deleted" })
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed" })
    })
}); 

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const post = req.body;
    if (post.text && post.userId) {
    postDB.update(id, post)
    .then (success => {
        res.status(200).json({ message: "Update Successful" })
    })
    .catch(err => {
        res.status(500).json({ error: "Post could not be modified." });
    })
    } else {
        res.status(400).json({ errorMessage: "Please provide post text and user ID." })
    }
});

module.exports = router;



