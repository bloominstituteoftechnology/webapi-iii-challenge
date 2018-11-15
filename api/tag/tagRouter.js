const express = require('express');
const tag = require('../../data/helpers/tagDb');
const router = express.Router();

router.get('/', (res, req) => {
    const { id } = req.params;
    tag.get()
    .then(tag => {
        res.json(tag)
    })
    .catch(err => {
        res.json({ message: err })
    })
});

module.exports = router;