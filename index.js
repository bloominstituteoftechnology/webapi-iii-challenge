const express = require('express');
const server = express();

const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

server.use(express.json());



server.get('/users', (req, res) => {
    userDb.get()
        .then(response =>
            res.status(200).json(response)
        )
        .catch(() => {
            res.status(500).json({ error: 'The users data could not be retrieved '})
        })
});

server.get('/users/:id', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(response => {
            if (response.length < 1) {
                res.status(404).json({ message: 'The user with this data does not exist'})
            }
            res.status(200).json(response)
        })
        .catch(() => {
            serverErrorMsg;
        })
});


server.post('/users', (req, res) => {
    const { name } = req.body;
    if ( { name } === null ) {
      res.status(400).json({ errorMessage: "Please provide name for the user." })
    } else {
        users.insert({ name })
        .then(response => {
          res.status(201).json(response)
        })
        .catch(() => {
          res.status(500).json({ error: "There was an error while saving the user to the database." })
        })
    }
  });



server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.remove(id)
      .then(response => {
        if (response > 0) {
          res.status(200).json(response)
        } else {
          res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
      })
      .catch(() => {
        res.status(500).json({ error: "The user could not be removed."})
      })
  });


  server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if ( { name } === null ) {
      res.status(400).json({ errorMessage: "Please provide name for the user."})
    } else {
      users.get(id)
        .then(response => {
          if (response.length < 1) {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
          } else {
            users.update(id, { name })
              .then((name) => {
                res.status(200).json(name);
              })
          }
        })
        .catch(() => {
          res.status(500).json({ error: "The user information could not be modified."})
        })
    }
  });




server.listen(8000, () => console.log('API running...'));