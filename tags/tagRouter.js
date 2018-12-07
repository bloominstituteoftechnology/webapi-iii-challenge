const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb');

router.get('/', (req, res) => {
    db
     .get()
     .then(tags => {
         res.json(tags);
     })
     .catch(error => {
         res.status(500).json({ error: 'Tags for post could not be retrieved.' });
     });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db
     .get(id)
     .then(tag => {
         if (tag === undefined) {
             res.status(404).json({ error: `Tag ${id} could not be found` });
         } else {
             res.status(200).json(tag);
         }
     })
     .catch(error => {
         res.status(500).json({ error: 'Could not retrieve tag information' });
     });
});

module.exports = router;