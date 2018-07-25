const express = require('express');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

// add your server code starting here
const server = express();
server.use(express.json());

server.get('/yo', (req, res) => {
  res.send('Hello World');
});

server.get('/api/posts', (req, res) => {
 
  postDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The posts information could not be retrieved." })
    })



});


server.listen(6000, () => console.log('API running on port 6000'));

