// Import Express
const express = require('express');

// Import Router
const router = express.Router();

// Import Post db
const db = require('../data/helpers/postDb.js');


// Endpoints
router.get('/', (req, res) => {
    res.send('hello 2');
});


// Export Router
module.exports = router;