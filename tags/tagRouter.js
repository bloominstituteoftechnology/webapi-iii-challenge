const express = require('express');

const router = express.Router();

const tagDb = require('../data/helpers/tagDb');


router.get('/', (req, res) => {
    tagDb.get()
    .then(tags => res.status(200).json(tags))
    .catch(error => res.status(500).json(error));
});


module.exports = router;
