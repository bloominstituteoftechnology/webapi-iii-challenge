const express = require('express');

const userRoutes = require('../users/userRoutes.js');
const postRoutes = require('../posts/postRoutes.js');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;