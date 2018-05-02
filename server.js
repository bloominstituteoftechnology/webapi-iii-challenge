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
  .then(target => {
    res.json(target);
  })
  .catch(err => {
    res.status(500).json({
      error: "The information could not be retrieved."
    });
  });
});

// get specific data
server.get('/api/:target/:id', (req, res) => {
  data[req.params.target]
  .get(req.params.id)
  .then(target => {
    if (target) {
      res.json(target);
    } else {
      res.status(404).json({
        err: "The data with the specified ID does not exist."
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error: "The information could not be retrieved."
    });
  });
});

// add new data
server.post('/api/:target', (req, res) => {
  data[req.params.target]
  .insert(req.body)
  .then(() => {
    res.status(201).json(req.body);
  })
  .catch(err => {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  });
});

server.listen(5000, console.log('\n== API Running on port 5000 ==\n'));