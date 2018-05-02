const express = require('express');

const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/:id/posts', (req, res, next) => {
    const { id } = req.params;
    
    userDb.getUserPosts(id)
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
});

router.get('/:id/posts/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(req.params);
    
    postDb.get(id)
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
});

module.exports = router;
