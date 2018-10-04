const express = require('express');

const router = express.Router();

const postDb = require('../data/helpers/postDb.js');

router.post('/', (req, res) => {
    console.log(req.body);
    const { text, userId } = req.body;
    const newPost = { text, userId };
    postDb.insert(newPost)
    .then(postId => {
        const { id } = postId;
        postDb.get(id)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: "The post with the specified ID does not exist."})
            } else
            return res.status(201).json(post);
        })
        .catch(() => res.status(500).json({ error: "There was an error while saving the post."}))
    })
    .catch(() => res.status(400).json ({ error: "Please provide text and username for this post."}))

});

router.get('/', (req, res) => {
    postDb.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(() => res.status(500).json({ error: "The posts could not be retrieved."}));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    postDb.get(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(() => res.status(404).json({ message: "The post with the specified ID does not exist"}) )
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text, userId } = req.body;
    const newPost = { text, userId };
    postDb.update(id, newPost)
    .then(post => {
        console.log('post = ', post);
        if (!post) {
            return res.status(404).json({ message: "The post with the specified ID does not exist."})
        } else {
        res.status(200).json(post);
        }
    })
    .catch(() => res.status(500).json({ error: "The post information could not be modified."}))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    postDb.remove(id)
    .then(removedPost => {
        if (removedPost === 0) {
            return res.status(404).json({ message: "The post with the specified ID does not exist. "})
        } else {
        res.status(200).json(removedPost);
        }
    })
    .catch(() => res.status(500).json ({ error: "The post could not be removed"}));
});

module.exports = router;