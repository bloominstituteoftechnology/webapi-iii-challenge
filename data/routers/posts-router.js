const express = require('express');
const router = express.Router();

const PostFuncs = require('../helpers/postDb.js')

router.get('/', async (req, res) => {
    const posts = await PostFuncs.get();
    try {
        res.status(200).json(posts)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Error retrieving posts'})
    }
});

module.exports = router;