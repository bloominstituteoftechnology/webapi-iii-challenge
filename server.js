const express = require('express');
const data = {
  posts: require('./data/helpers/postDb'),
  users: require('./data/helpers/userDb'),
  tags: require('./data/helpers/tagDb')
}


const server = express();
server.use(express.json());

// get all data pertaining to target param
server.get('/api/:target', (req, res) => {
  data[req.params.target]
  .get()
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  });
});

server.listen(5000, console.log('\n== API Running on port 5000 ==\n'));