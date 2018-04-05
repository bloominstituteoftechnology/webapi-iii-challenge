const express = require('express');
const router = express.Router();

const db = require('../data/helpers/tagDb.js');

router.get('/', (req,res) => {
    db
    .get()
    .then(tags => res.status(200).json(tags))
    .catch(error => console.error(error));
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db
    .get(id)
    .then(tag => res.status(200).json(tag))
    .catch(error => console.error(error));
})

router.post('/', (req, res) => {
    const { tag } = req.body;

    let tags;
    
    db
    .get()
    .then(tags => res.status(200).json(tags))
    .catch(error => console.error(error));

    if (tag === undefined || typeof tag !== 'string' || tag.length > 80) return false;
})

module.exports = router;