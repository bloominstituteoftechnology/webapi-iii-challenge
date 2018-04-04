const express = require('express');
const router = express.Router();

const db = require('../data/helpers/tagDb.js');

router.get('/', (req,res) => {
    db
    .get()
    .then(tags => res.status(200).json(tags))
    .catch(error => console.error(error));
})

module.exports = router;