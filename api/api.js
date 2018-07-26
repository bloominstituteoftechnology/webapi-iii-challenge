const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes/userRoutes');
const postRoutes = require('./postRoutes/postRoutes');
const tagRoutes = require('./tagRoutes/tagRoutes')

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);

module.exports = router;