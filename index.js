// console.log('something is running! YO!');

const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');

const server = express();

const PORT = 5050;

server.use(express.json());
server.use(helmet());
server.use(logger('tiny'));

server.get('/', (req, res) => {
    res.json({message: "request recieved, YO YO YO!"})
});

// Other CRUD operations below

server.get('/api/users', (req, res) => {
    userDB
        .get()
        .then((users) => {
            res.json(users);
        })
        .catch(err => {
            res
            .status(500)
            .json({error: "The users could not be retrieved."})
        });
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    userDB
        .get(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res
                    .status(404)
                    .json({error: "The user with the specified ID does not exist"});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: "The user information could not be retrieved. "})
        })
    });

server.post('/api/users', (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
    userDB.insert(newUser)
    .then(idInfo => {
      userDB
        .get(idInfo.id)
        .then(user => {
          res
            .status(201)
            .json(user);
          })
        })
        .catch(err => {
          res
            .status(500)
            .json({message: "There was an error while saving the user to the database"})
        })
  } else {
    res
      .status(400)
      .json({message: "Provide the name of the new user to be added to the database."})
  }
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDB
    .remove(id)
    .then(count => {
      if (count) {
        res
          .json({message: "User successfully deleted."})
      } else {
        res
          .status(404)
          .json({message: "The user with the specified ID doens not exist."})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "The user could not be removed."})
    })
});

server.put('/api/users/:id', (req, res) => {
  const editUser = req.body;
  const {id} = req.params;
  if (editUser) {
    userDB.update(id, editUser)
    .then(count => {
      if (count) {
        res
          .json({message: "The user was edited."});
      } else {
        res
          .status(404)
          .json({message: "The user with the specified ID does not exist."});
      }
    })
    .catch(err => {
      res
        .stats(500)
        .json({message: "The user information could not be updated."})
    })
  } else {
    res
      .status(400)
      .json({message: "Provide user's new name!"})
  }
})


// Keep this last!

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});