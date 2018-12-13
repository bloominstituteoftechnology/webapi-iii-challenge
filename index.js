const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
const parser = express.json();
const PORT = 4000;

server.use(express.json())
//User Endpoints
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

  //Get user posts Endpoint
server.eventNames
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
      // count = id
      // get(id) promise to return a message that includes the user deleted
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
  // Update
server.put('/api/users/:id', (req, res) => {
  const user = req.body;
  const {id} = req.params;
  if(user.name) {
    userDb.update(id, user)
      .then(count => {
        if(count){
          userDb.get(id)
            .then(user => {
              res
                .status(204)
                .json({message: `${user.name} uPDATED`})
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({message: "Failed to update user"})
      })
  }else{
    res
      .status()
      .json({message: "New User name missing"})
  }
})

//Post Endpoints
  //Get Posts
  server.get('/api/posts/', (req, res) => {
    postDb.get()
      .then(posts => {
        res
          .status(200)
          .json(posts)
      })
      .catch(err => {
        res
          .status(500)
          .json({message: "Failed to get posts"})
      })
  })

  //Get post by id
server.get('/api/posts/:id', (req, res) => {
  const {id} = req.params;
  postDb.get(id)
    .then(post=> {
      console.log(post)
      if(post){
        res
          .status(200)
          .json(post)
      } else {
        res
          .status(404)
          .json({message: "Post not found under that id"})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "Failed to get Post"})
    })
})

//Listening 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})