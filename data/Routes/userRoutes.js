
const express = require('express');
const db = require('../helpers/userDb');
const router = express.Router();

router.post('/users', (req, res, next) => {
    const userData = req.body;
    console.log('user data', userData)
    db
    .insert(userData)
    .then(response => {
        res.status(201).json(response);
    })
    .catch( err => {
        res.status(500).json({ error: error })
    })
})


module.exports = router;