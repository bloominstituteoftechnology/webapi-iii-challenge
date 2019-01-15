const express = require('express');
const router = express.Router();
const userDb = require('../helpers/userDb');

const customMiddleware = require('../middleware/middleware')

// Get all users
router.get('/', (req,res) =>{
  userDb.get()
    .then(users => {
      res
        .status(200)  
        .json(users)
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "Failed toget users"})
    })
})

  //Get user by id
router.get('/:id',  (req,res) => {
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
          .json({message: "No postsunder this user"})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({message:"User does notexist"})
      })
})

  // Add user
router.post('/', customMiddleware.uppercase, (req,res)=> {
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
              .json({message: `UserAdded`})
      })
    })
      .catch(err => {
          res
          .status(500)
          .json({message: " Failed toadd user"})
      })
  } else {
    res
    .status(400)
    .json({message: "Missing username"})
  }
})

  
  //Delete user 
router.delete('/:id', (req,res) => {
  const {id} = req.params;
  userDb.remove(id)
    .then(count => {
      // count = id
      // get(id) promise to return amessage that includes the userdeleted
      res
        .status(200)
        .json(count)
    })
    .catch(err => {
      res
        .status(500)
        .catch({message: "Failed todelete user"})
    })
})
  // Update
router.put('/:id', (req,res) => {
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
                .json({message: `{user.name} Updated`})
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({message: "Failed toupdate user"})
      })
  }else{
    res
      .status()
      .json({message: "New User namemissing"})
  }
})

module.exports = router;
