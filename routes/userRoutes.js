// Import Express
const express = require('express');

// Import Router
const router = express.Router();

// Import User db
const db = require('../data/helpers/userDb.js');


// Endpoints
router.get('/', (req, res) => {
    res.send('hello');
});

// Export Router
module.exports = router;