//imports
const express = require('express');
const cors = require('cors')
const userDb = require('../data/helpers/userDb');

//connects express and server
const server = express();

//middleware
server.use(express.json());
server.use(cors());

//custom middleware
const upperCase = (request, response, next) => {
    console.log(request.body.name.toUpperCase());
    request.body.name  =  request.body.name.toUpperCase();
    next();
};
 

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
 server.post('/api/users', upperCase, (req, res) => {
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

  //UPDATE user
  server.put('/api/users/:id', upperCase, (req, res) => {
      const { id } = req.params;
      const user = req.body;

      userDb.update(id,user)
      .then (count => {
          if (count) {
              res.status(200).json({ message: `${count} user(s) updated`});
          } else {
              res.status(404).json({ message: 'User does not exist'})
          }
      })
      .catch(error => {
          res.status(500).json({ message: error})
      })
  })

 //DELETE user 
  server.delete('/api/users/:id', (req, res) => {
      const { id } = req.params;

      userDb.remove(id)
      .then(count => {
          if (count) {
              res.status(200).json({ message: `${count} user(s) deleted`})
          } else {
              res.status(404).json({ message: 'user does not exist'})
          }
      })
      .catch (error => {
          res.status(500).json ({ message: error})
      })
  })
module.exports = server;