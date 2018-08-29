
const express = require('express');
const server = express();
const userDb = require('./data/helpers/userDb.js');


 server.use(express.json());

 server.get('/', (req, res) => {
    res.send('Welcome to Node-Blog');
} );

server.get('/users', (req, res) => {
    userDb.find().then(users => {
      res.status(200).json(users)
    }).catch(err => {
      console.error('error', err);
       res.status(500).json({ message: 'Error retrieving user data'})
    });
  });

 server.listen(8000, () => console.log('/n== API on port 8000 ==/n') )