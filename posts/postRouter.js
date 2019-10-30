const express = require('express');

//Import function model
const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.get(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ message: "error retrieving posts"})
    })
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;