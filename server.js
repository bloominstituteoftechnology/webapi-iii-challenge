const express = require('express');
const postdb = require('./data/helpers/postDb.js');
const tagdb = require('./data/helpers/tagDb.js');
const userdb = require('./data/helpers/userDb');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());


const capitalizeUserName = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}


server.get('/', (req, res) => {
  res.send('Hello')
})


// All Users
server.get('/users', (req, res) => {
  userdb.get().then(users => {
    res.status(200).json(users)
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error getting users'})
  });
})


// All Posts
server.get('/posts', (req, res) => {
  postdb.get().then(posts => {
    res.status(200).json(posts)
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error getting posts'})
  });
})


// User Posts
server.get('/users/:id', (req, res) => {
  const {id} = req.params;
  userdb.getUserPosts(id)
    .then(users => {
      users === undefined || users.length === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error getting users'})
    });
})


// Add User
server.post('/users', capitalizeUserName, (req, res) => {
  const { name } = req.body;
  !name ?
  res.status(400).json({message: 'You need a name'}) : null
  const body = {name}
  userdb.insert(body)
  .then(userId => {
    res.status(200).json(userId)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({messege: 'The user could not added'});
  });
});


// Delete User
server.delete('/users/:id', (req, res) => {
  const {id} = req.params;
  userdb.remove(id)
    .then(users => {
      users === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error removing user'})
    });
})


// Update User
server.put('/users/:id', capitalizeUserName, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  !name ? res.status(400).json({message: "Please provide a name."}) 
  :
  null

  const body = { name }

  userdb.update(id, body)
    .then(users => {
      users === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error removing user'})
    });
})


server.listen(7000, () => console.log('Hello'))
