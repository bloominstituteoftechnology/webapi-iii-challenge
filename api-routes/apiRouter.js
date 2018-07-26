const express = require('express')

const userRoutes = require('./routes/user-router.js')
const postRoutes = require('./routes/post-router.js')
const tagRoutes = require('./routes/tag-router.js')

const api = express.Router();

api.use('/users', userRoutes);
api.use('/posts', postRoutes);
api.use('/tags', tagRoutes);

module.exports = api;
