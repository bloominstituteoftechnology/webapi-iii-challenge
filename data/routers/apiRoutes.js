const express = require('express');

const postRoutes = require('./postRoutes');

const router = express.Router();

router.use('/posts', postRoutes)

module.exports = router;