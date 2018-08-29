const express = require('express');

const server = express();

const userDb = require('./data/helpers/userDb.js');

const postDb = require('./data/helpers/postDb.js');

function upperName(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

server.use(express.json());

// configure routing

server.get('/users', (req, res) => {
  userDb.get().then(users => {
    res.status(200).json(users)
  }).catch(err => {
    console.error('error', err);

    res.status(500).json({ message: 'Error retrieving data'})
  });
});

server.get('/users/:id', (req, res) => {
  userDb.get(parseInt(req.params.id)).then(user => {
    if (user === undefined) {
      res.status(404).json({ message: 'Sorry: the user specified does not exist'});
    }
    else {
      res.status(200).json(user);
    }
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, there was an error saving the user'})
  })
})

server.post('/users', upperName, async (req, res) => {
  const user = req.body;
  if (user.name) {
    try {
      const response = await userDb.insert(user);
      res.status(201).json({ message: "User was successfully added"});
    }
    catch (err) {
      res.status(500).json({ message: "Error adding user"});
    }
  }
  else {
    res.status(422).json({ message: "Must have a name to add user"});
  }
})

server.put('/users/:id', upperName, (req, res) => {
  console.log(req.params.id);
  if (!req.body.name) {
    res.status(422).json({ message: 'Must have a name to add user.'});
  }
  else {
    userDb.update(req.params.id, req.body).then(count => {
      if (count !== 1) {
        res.status(404).send('The user you requested does not exist');
      }
      else {
        res.status(201).json({ message: 'User was successfully updated!'});
      }
    }
  ).catch(err => {
    res.status(500).json({ message: 'Sorry, there was an issue with the server'});
  })
}});

server.delete('/users/:id', (req, res) => {
  userDb.remove(req.params.id).then(count => {
    if (count !== 1) {
      res.status(404).json({ message: 'The user with the specified ID does not exist.' });
    }
    else {
      res.status(200).json({ message: 'The user was successfully deleted' });
    }
  }).catch(err => {
    res.status(500).json({ message: 'The user could not be deleted - please try again'})
  })
})

server.listen(8000, ()=>console.log('Hello!'))
