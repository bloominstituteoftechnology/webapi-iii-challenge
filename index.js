const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const helmet = require('helmet')
const logger = require('morgan');
const customMiddleware = require('./data/middleware/middleware')

const server = express();
const parser = express.json();
const PORT = 4000;

//Midleware
server.use(
  express.json(),
  helmet(),
  logger('dev')
);


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
server.get('/api/users/:id',  (req,res) => {
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
server.post('/api/users',customMiddleware.uppercase, (req,res) => {
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
            res
              .status(200)
              .json({message: `User Added`})
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
                .json({message: `${user.name} Updated`})
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

  //Update Post
server.put('/api/posts/:id', (req, res) => {
  const {id} = req.params;
  const post = req.body;

  if(post.text) {
    postDb.update(id, post)
      .then(count  => {
        if(count) {
          postDb.get(id)
            .then(post => {
              res
                .status(202)
                .json(post)
              }
            )
        } else {
          res
            .status(404)
            .json({message: "Invalid Post id"})
        }
      })
        .catch(err => {
          res
            .status(500)
            .json({message: "Failed to Update Post"})
        })
    } else {
      res 
        .status(400)
        .catch({message: "Missing Post text"})
    }
})

  //Delete Post
server.delete('/api/posts/:id', (req, res)=> {
  const {id} = req.params;
  console.log(id);
  postDb.remove(id)
  //deletes the post but get catch message as the reponse - works now
  .then(count => {
    console.log(count)
    res
      .status(200)
      .json(count)
  })
    .catch(
      res
        .status(500)
        .json({message: "Failed to delete Post"})
    )
})


//Listening 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})