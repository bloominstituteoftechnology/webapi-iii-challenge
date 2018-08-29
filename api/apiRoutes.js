const express = require('express');

//routes
const usersRoutes = require('./users/usersRoutes');
const postsRoutes = require('./posts/postsRoutes');

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);

module.exports = router;
