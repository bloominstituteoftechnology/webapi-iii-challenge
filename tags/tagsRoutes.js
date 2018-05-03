const express = require('express');

const tagDb = require('../data/helpers/tagDb');

const router = express.Router();

router.get('/', (req, res) => {

    tagDb.get()
        .then((response) => {
            res.status(200).send(response)
        }).catch((error) => {
            res.status(500).send({error: `Problem getting tabs from database`})
    })
});

module.exports = router;