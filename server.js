const express = require('express');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');

const server = express();
server.use(express.json());

// get all posts
server.get('/api/posts', (req, res) => {
  posts
  .get()
  .then(posts => {
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  });
});

server.listen(5000, console.log('\n== API Running on port 5000 ==\n'));