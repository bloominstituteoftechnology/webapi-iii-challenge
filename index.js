const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

//============USERS============

server.get('/api/users', (req, res) => {
  userDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json({ error: "The users information could not be retrieved"});
    });
});

server.get('/api/users/:id', (req, res) => {
  userDb.get(req.params.id)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The user information could not be retrieved"});
    });
});

server.post('/api/users',(req, res) => {
  const name = req.body.name;
  if (!name || name.length > 128) {
    res.status(400)
      .json({ message: "Please provide a user name up to 128 characters long"});
    return;
  }
  userDb.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "There was an error saving user to the database"});
    });
});

server.delete('/api/users/:id', (req,res) => {
  userDb.remove(req.params.id)
    .then(response => {
      if (response === 0) {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist"});
      } else {
        res.status(200);
      }
    });
});

server.put('/api/users/:id', (req, res) => {
  const name = req.body.name;
  if (!name || name.length > 128) {
    res.status(400)
      .json({ message: "Please provide a user name up to 128 characters long"});
    return;
  }
  userDb.update(req.params.id, req.body)
    .then(response => {
      if (response === 0) {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200);
      }
    })
    .catch(() => {
      res.status(500)
        .json({ error: "The user information could not be modified"});
    });
});

//============Posts============

server.get('/api/posts', (req, res) => {
  postDb.get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
        .json({ error: "The posts information could not be retrieved"});
    });
});

server.get('/api/posts/:userId', (req, res) => {
  postDb.get(req.params.userId)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ message: "The post with the specified user ID does not exist" });
      }
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The post information could not be retrieved"});
    });
});

server.post('/api/posts', (req, res) => {

})

server.listen(8000, () => console.log('API running on port 8000'));