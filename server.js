const express = require('express');
const postdb = require('./data/helpers/postDb.js');
const tagdb = require('./data/helpers/tagDb.js');
const userdb = require('./data/helpers/userDb.js');

const cors = require('cors');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('API running');
});

server.get('/api/user/:id', (req, res) =>{
  const id = req.params.id;
  userdb
    .get(id)
    .then(user => {res.json(user)})
    
});

server.listen(8000, () => console.log('\n== API Running on port 8000 ==\n'));
