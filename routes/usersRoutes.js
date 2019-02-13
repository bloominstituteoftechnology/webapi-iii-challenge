const express = require('express');
const router = express.Router();
const db = require('../data/helpers/userDb');



router.get('/', (req, res) => {
    db.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({error: "The users information could not be retrieved."})
        })
});

module.exports = router;