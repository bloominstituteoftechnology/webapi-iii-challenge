const express = require('express');

const router = express.Router();

// Sub-Routers
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

router.use('/', (req, res) => res.send('Welcome to the Main API'));

module.exports = router;