const express = require('express');

const db2 = require('../data/helpers/tagDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    db2
        .get()
        .then(tags => {
            res.json(tags);
        })
        .catch(error => {
            res.status(404).json({
                error: "Tags could not be found"
            })
        })
})


module.exports = router;