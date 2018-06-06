const express = require('express');
const tagDb = require('../data/helpers/tagDb');

const router = express.Router();

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

module.exports = router;