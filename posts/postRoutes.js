const express = require('express');

const router = express.Router();

const postDb = require('./data/helpers/postDb.js');

router.post('/', (req, res) => {
    console.log(req.body);
    const { text, postedBy } = req.body;
    const newPost = { text, postedBy };
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

module.exports = router;