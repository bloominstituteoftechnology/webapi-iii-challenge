const express = require('express');

const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

const server = express();

server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));

