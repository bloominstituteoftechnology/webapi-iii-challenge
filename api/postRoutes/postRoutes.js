const express = require('express');
const router = express.Router();
const postDb = require('../../data/helpers/postDb');

router.get('/', (req, res, next) => {
    postDb.get()
        .then(postData => {
            res.status(200).json(postData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The posts could not be retrieved."
            })
        })
});

module.exports = router;