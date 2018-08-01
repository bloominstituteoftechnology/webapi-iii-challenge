const express = require('express');
const helmet = require('helmet');
// const cors = require('cors');

const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');

const server = express();

server.use(express.json());
server.use(helmet());
// server.use(cors({}));

server.get('/', (req, res) => {
    res.send('Api Running');
});

server.get('/api/users', (req, res) => {

  users
    .get()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res.status(500).json({ error: err });
      return;  
    })
});


    


server.listen(5000, () => console.log('\n=== Api running on port 5000 ===\n'));
