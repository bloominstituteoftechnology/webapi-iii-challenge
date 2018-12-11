const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
const parser = express.json();
const PORT = 4000;

//Endpoints
  // Get all users
server.get('/api/users', (req,res) => {
  userDb.get()
    .then(users => {
      res
        .status(200)  
        .json(users)
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "Failed to get users"})
    })
})

  //Get user by id
server.get('/api/users/:id', (req,res) => {
  const {id} = req.params;
  userDb.getUserPosts(id) 
    .then(posts => {
      if(posts.length > 0) {
        res
          .status(200)
          .json(user)
      } else {
        res
          .status(404)
          .json({message: "No posts under this user"})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({message:"User does not exist"})
      })
})

//Listening 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})