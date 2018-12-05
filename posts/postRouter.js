const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb');

router.get('/', (req, res) => {
    db
     .get()
     .then(posts => {
         res.json(posts);
     })
     .catch(error => {
         res.status(500).json({ error: 'Unable to retrieve posts.' });
     });
});

module.exports = router;