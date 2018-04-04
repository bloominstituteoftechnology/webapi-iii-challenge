const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb.js');

router.get('/', (req,res) => {
    db
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(error => console.error(error));
})
module.exports = router;