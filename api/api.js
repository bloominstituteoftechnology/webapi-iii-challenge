const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes/userRoutes');
const postRoutes = require('./postRoutes/postRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;