const express = require('express');
const bodyParser = require('body-parser');

const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

const server = express();



server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

server.get('/api/users', function(req,res) {
  userDb.getUserPosts()
    .then(users => {
      res.join('users as u', 'u.id', 'p.userId').select('p.id', 'p.text', 'u.name as postedBy').where('p.userId', userId).json(users);
  })
    .catch(error => {
      res.status(500).json(error);
  });
});


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));

