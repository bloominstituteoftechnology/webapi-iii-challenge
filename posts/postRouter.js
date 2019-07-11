const express = require('express');

const Posts = require("../posts/postDb.js");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await posts.get(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving posts."
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id);
        if (post) {
            req.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving post" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({ message: "Post was destroyed" })
        } else {
            res.status(404).json({ message: "Post not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.update(req.params.id, req.body);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating post" })
    }
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;