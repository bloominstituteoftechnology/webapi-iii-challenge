const posts = require('express').Router();

// Middleware
const middleware = require('./helpers');
posts.use(require('express').json());

// Requests
const createPost = require('./createPost');
const deletePost = require('./deletePost');
const getAllPosts = require('./getAllPosts');
const getSinglePost = require('./getSinglePost');
const getTagsByPost = require('./getTagsByPost');
const updatePost = require('./updatePost');

// Routes
posts.post('/', middleware.getUsers, middleware.validateRequestData, createPost);
posts.get('/', getAllPosts);
posts.get('/:id', getSinglePost);
posts.put('/:id', middleware.getUsers, middleware.validateRequestData, updatePost);
posts.delete('/:id', deletePost);

module.exports = posts;