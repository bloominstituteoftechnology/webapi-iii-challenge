const express = require('express');
const router = express.Router();
const tags = require('../data/helpers/tagDb');

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

// *****************  Get Tags  *************************
router.get('/', (req, res) => {
    tags
        .get()
        .then(tag => {
            res.json({ tag });
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
});

module.exports = router;
