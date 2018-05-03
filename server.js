const express = require('express');
const data = {
  posts: require('./data/helpers/postDb'),
  users: require('./data/helpers/userDb'),
  tags: require('./data/helpers/tagDb')
}

const server = express();
const userRoutes = require('./routes/userRoutes');
server.use(express.json());
server.use('/api/users', userRoutes);

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
    .then(objId => {
      res.status(201).json(objId);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

// update data by id
server.put('/api/:target/:id', (req, res) => {
  data[req.params.target]
    .update(req.params.id, req.body)
    .then(found => {
      if (found) {
        res.status(200).json(req.body);
      } else {
        res.status(404).json({
          err: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be modified."
      });
    });
});

// delete specific data
server.delete('/api/:target/:id', (req, res) => {
  data[req.params.target]
    .remove(req.params.id)
    .then(id => {
      if (id) {
        res.json(id);
      } else {
        res.status(404).json({
          err: "The data with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The data could not be removed"
      });
    });
});

server.listen(5000, console.log('\n== API Running on port 5000 ==\n'));