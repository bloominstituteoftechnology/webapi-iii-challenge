const tags = require('express').Router();

// Middleware
tags.use(require('express').json());

// Requests
const createTag = require('./createTag');
const deleteTag = require('./deleteTag');
const getAllTags = require('./getAllTags');
const getSingleTag = require('./getSingleTag');
const updateTag = require('./updateTag');

// Routes
tags.post('/', createTag);
tags.get('/', getAllTags);
tags.get('/:id', getSingleTag);
tags.put('/:id', updateTag);
tags.delete('/:id', deleteTag);

module.exports = tags;