const express = require('express');
const userRoutes = require('./users/userroutes');
const tagRoutes = require('./tags/tagRoutes');
const postRoutes = require('./posts/postRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
