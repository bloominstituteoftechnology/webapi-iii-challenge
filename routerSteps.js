// require express
const express = require('express');
// create router
const router = express.Router();


// middleware

// endpoints
router.get('/', (req, res) => {
    res.send('GET /products');
})