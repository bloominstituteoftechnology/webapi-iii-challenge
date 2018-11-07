const express = require('express');
const cors = require('cors')

const userDb = require('../data/helpers/userDb');

const server = express();

server.use(express.json());
server.use(cors());
//GET all users

server.get('/api/users', (req, res) => {
    userDb.get()
    .then( users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({message: error})
    })
    
  });

  //GET users by :id 
  server.get('/api/users/:id', (req, res) => {
      const { id } = req.params;

      userDb.get(id) 
      .then(user => {
          console.log('GET user by id:', user)
          if (user) {
              res.status(200).json(user)
          } else {
              res.status(404).json({message: 'User Not Found'})
          }
      })
      .catch( error => {
          res.status(500).json({ message: error})
      })
  })

 //GET user's posts
 
 server.get('/api/users/:id/posts', (req, res) => {
     const { id } = req.params;

     userDb.getUserPosts(id)
     .then(posts => {
         res.status(200).json(posts);
     })
     .catch(error => {
         res.status(500).json({ message:error})
     })
 })

 //POST (create) new user
 server.post('/api/users', (req, res) => {
    const user = req.body;
    const { name } = user;
    console.log('POST', user);
     if (!name) {
      res.status(400).json({ message: "Name required" })
    }
     userDb.insert(user)
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(error => {
        res.status(500).json({ message: error });
      })
  });
module.exports = server;