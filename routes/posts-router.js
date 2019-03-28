const express = require('express');

const posts = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res) => {
    posts
        .get()
        .then(foundPosts => {
            res.json(foundPosts)
        })
        .catch(err => {
            res.status(404).json({message: 'no access'});
          });
})

router.get('/:id', (req, res) => {
    posts
        .getById(req.params.id)
        .then(foundPost => {
            res.json(foundPost)
        })
        .catch(err => {
            res.status(404).json({message: 'no access'});
          });
})

router.post('/', (req, res) => {
    posts
        .insert(req.body)
        .then(res => {
            res.json(res)
        })
        .catch(err => {
            res.status(500).json({message: 'no access'});
          });
})


module.exports = router;