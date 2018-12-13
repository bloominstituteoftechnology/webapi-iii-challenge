const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
const parser = express.json();
const PORT = 4000;

server.use(express.json())
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
  console.log(id);
  userDb.getUserPosts(id) 
    .then(posts => {
      if(posts.length > 0) {
        res
          .status(200)
          .json(posts)
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
  

  // Add user
  server.post('/api/users', (req,res) => {
      const user = req.body;
    console.log(user);
    //logs undefined
    if(user.name) {
        userDb.insert(user)
        .then(userId => {
            console.log(userId)
          userDb.get(userId)
            .then(user => {
                console.log(user)
          })
      })
        .catch(err => {
            res
            .status(500)
            .json({message: " Failed to add user"})
      })
  } else {
        res
        .status(400)
        .json({message: "Missing user name"})
  }
})


  //Delete user 
server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;
  userDb.remove(id)
    .then(count => {
      res
        .status(200)
        .json(count)
    })
    .catch(err => {
      res
        .status(500)
        .catch({message: "Failed to delete user"})
    })
})


//Listening 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})