const express = require('express');
const userDb = require('../data/helpers/userDb');

const router = express.Router();

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

module.exports = router;