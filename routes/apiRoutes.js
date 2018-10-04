const express = require('express');

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

const apiRoutes = express.Router();

// use router for all /users calls
apiRoutes.use('/users', userRoutes);

// use router for all /posts calls
apiRoutes.use('/posts', postRoutes);

module.exports = apiRoutes;