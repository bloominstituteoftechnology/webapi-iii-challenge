const express = require('express');
const Post = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    Post.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not retrieve the posts from the database' });
        });
});

router.get('/:id', validatePostId, (req, res) => {
    res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
    Post.remove(id)
        .then(num => {
            res.status(200).json(req.post);
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to successfully delete post from database' });
        });
});

router.put('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
    const { user_id, text } = req.body;

    Post.update(id, { user_id, text })
        .then(num => {
            if(num > 0) {
                res.status(200).json({...req.post, text });
            } else {
                if(!text) {
                    res.status(400).json({ message: 'Request body is missing the text field' });
                } else if(!user_id) {
                    res.status(400).json({ message: 'Request body is missing the user_id field' });
                };
            };
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error while trying to update the post' });
        });
});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;

    Post.getById(id)
        .then(post => {
            if(post) {
                req.post = post;
                next();
            } else {
                res.status(400).json({ message: 'invalid post id' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "unable to retrieve the post" });
        });
};

module.exports = router;