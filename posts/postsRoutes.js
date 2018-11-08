const dbPost = require('../data/helpers/postDb.js');

const express = require('express');

const router = express.Router();

// CRUD operations

router.get('/', async (req, res) => {
    try {
        const posts = await dbPost.get();
        res.status(200).json(posts);
    } catch(err) {
        res.status(404).json({ message: err});
    }
});

module.exports = router;