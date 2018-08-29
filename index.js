const express = require('express');

const server = express();

const userDb = require('./data/helpers/userDb.js');

const postDb = require('./data/helpers/postDb.js');


server.use(express.json());

// configure routing

server.get('/users', (req, res) => {
  userDb.find().then(users => {
    res.status(200).json(users)
  }).catch(err => {
    console.error('error', err);

    res.status(500).json({ message: 'Error retrieving data'})
  });
});

server.post('/users', authenticate, async (req, res) => {
  const user = {
    "name": req.body.name,
    "bio": req.body.bio
  };
  if (user.name && user.bio) {
    try {
      const response = await db.insert(user);
      res.status(201).json({ message: "User was successfully added"});
    }
    catch (err) {
      res.status(500).json({ message: "Error adding user"});
    }
  }
  else {
    res.status(422).json({ message: "Must have both name and bio to add user"});
  }
})

server.listen(8000, ()=>console.log('Hello!'))
