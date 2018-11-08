const express = require('express');
const tagDb = require('../data/helpers/tagDb.js');

const router = express.Router();

// ***** GET tag by tag id *****
// Tag exists --> respond tags by tag id
// Tag doesn't exist --> error
router.get('/:id', (req, res) => {
    tagDb.get(req.params.id)
        .then(tag => {
            if (tag) {
                res.status(200).json(tag);
            } else {
                res.status(404).json({ error: `The tag with id ${req.params.id} does not exist.`})
            }
        })
        .catch(err => {
            res.status(500).json({ error: `The tag with id ${req.params.id} could not be retrieved.` })
        });
});

module.exports = router;