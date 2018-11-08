const express = require('express')
const postDb = require('../data/helpers/postDb.js');
const router = express.Router();



router.get('/:id', (req, res) => {
    const { id } = req.params
    postDb.get(id)
        .then(post => {
                res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: 'The post ID can not be found'})
        })
})












module.exports = router;