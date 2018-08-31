const express = require('express');
const userModel = require('./userModel.js');


const router = express.Router();


// Middleware
const capitalizeUserName = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}



// All Users
router.get('/', (req, res) => {
  userModel.get().then(users => {
    res.status(200).json(users)
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error getting users'})
  });
})


// User Posts
router.get('/:id', (req, res) => {
  const {id} = req.params;
  userModel.getUserPosts(id)
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
router.post('/', capitalizeUserName, (req, res) => {
  const { name } = req.body;
  !name ?
  res.status(400).json({message: 'You need a name'}) : null
  const body = {name}
  userModel.insert(body)
  .then(userId => {
    res.status(200).json(userId)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({messege: 'The user could not added'});
  });
});


// Delete User
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  userModel.remove(id)
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
router.put('/:id', capitalizeUserName, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  !name ? res.status(400).json({message: "Please provide a name."}) 
  :
  null
  const body = { name }
  userModel.update(id, body)
    .then(users => {
      users === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error updating user'})
    });
})


module.exports = router;
