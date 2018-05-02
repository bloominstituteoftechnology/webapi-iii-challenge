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

module.exports = router;