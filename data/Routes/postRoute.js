const express = require('express');

const router = express.Router();

const postDb = require('../helpers/postDb');

router.get('/', (req, res) => {
    postDb.get().then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: "No post here"})
)
})

router.get('/:id', (req, res) => {
    postDb.get(req.params.id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(post);
    })
    .catch(error => {
        res.status(500).json({ error: "User info could not be got"})
    });
})

router.post('/', (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text)
    res.status(400).json({ errorMessage: "Give some text fool"});
    postDb.insert({ userId, text })
    .then(posts => res.status(201).json({userId, text}))
    .catch(err => res.status(400).json({ error: "Error Saving post"}))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(req.params.id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({message: "That ID dont exist"});
        }
        res.status(200).json({message: "Gone forever no turning back now"});
    })
    .catch(error => {
        res.status(500).json({error: "Error Deleting Post"})
    });
})

router.put('/:id', (req, res) => {
    const { text } = req.body;
    if(!text)
    res.status(400).json({ errorMessage: "Provide text please"});
    postDb.update(req.params.id, {text})
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json({text});
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });
})

router.get('/:id/tags', (req, res) => {
    postDb.getPostTags(req.params.id)
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({message:"ID doesnt exist"});
        }
        res.status(200).json(tags);
    })
    .catch(error => {
        res.status(500).json({error: "Post tag cant be retrieved"})
    });
})


module.exports = router;