const express = require('express');
const userRoutes = require('../users/userRoutes');
const postRoutes = require('../posts/postRoutes');
const tagRoutes = require('../tags/tagRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
