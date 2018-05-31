const express = require('express');
const cors = require('cors');

const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');


// database helpers
// const posts = require('./data/helpers/postDb.js')
// const users = require('./data/helpers/userDb.js')
// const tags = require('./data/helpers/userDb.js')
// server.get('/api/users')
// server.get('/api/posts')
// server.get('/api/tags')```