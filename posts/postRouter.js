const express = require('express');

const router = express.Router();

const postDb = require('../data/helpers/postDb.js');


router.get('/', (req, res) => {
    postDb.get()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});


module.exports = router;
