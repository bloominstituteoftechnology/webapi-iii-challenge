const express = require('express');

const postDb = require('../data/helpers/postDb');

const router = express.Router();

//get all post
router.get('/', (req, res) => {
    postDb
        .get()
        .then((response) => res.status(200).send(response))
        .catch(() => res.status(500).send({ error: 'Error fetching posts' }))
});

//get post by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    postDb
        .get(id)
        .then((response) => response.length === 0
            ? res.status(200).send({error: `Post not found`})
            : res.status(200).send(response))
        .catch(() => res.status(500).send({ error: 'Error fetching post' }))
});

// post new post
router.post('/', (req, res) => {
    const text= req.body.text;
    const userId = req.body.userId;

    if (!text && !userId) {
        res.status(400).send({error: 'Please provide a name for the user'});
    }

    postDb.insert(req.body).then(post => {
        res.status(200).send(req.body)
    }).catch(err => {
        res.status(500).send({error: 'There was a error while saving to user to database'});
    })
});


module.exports = router;