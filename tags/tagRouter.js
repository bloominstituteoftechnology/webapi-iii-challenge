const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js');


router.get('/', (req, res) => {
    db.get()
    .then(tags => res.status(200).json(tags))
    .catch(error => res.status(500).json(error));
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.get(id)
    .then(tags => res.status(200).json(tags))
    .catch(error => res.status(500).json(error));
})

module.exports = router;