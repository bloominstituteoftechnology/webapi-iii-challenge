const express = require('express');
const db = require('./data/dbConfig');

const server = express();
server.use(express.json());

// get all posts
server.get('/api/posts', (req, res) => {
  db
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