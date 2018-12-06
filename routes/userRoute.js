const express = require('express');

const router = express.Router()

const customMW = require('../customMW')

const userDB = require('../data/helpers/userDb')

router.use(customMW)

router.get('/', (req, res) => {
  userDB.get()
    .then( users => {
      res.status(200).json(users)
    }).catch( err => {
      res.status(400).json({message: 'unable to get the users'})
    })
})

//getting user by ID
router.get('/:id', (req, res) => {
  const {id} = req.params;

  userDB.get(id)
    .then( user => {
      res.status(200).json(user)
    }).catch( err => {
      res.status(400).json({message: 'unable to get user'})
    })
})

//getting user posts by ID
router.get('/posts/:userId', (req, res) => {
  const user = req.params;
  userDB.getUserPosts(user.userId)
    .then( posts => {
      res.status(200).json(posts)
    }).catch( err => {
      res.status(400).json({message: 'unable to get user posts'})
    })
})

//creating a new user
router.post('/', (req, res) => {
  const user = req.body;

  userDB.insert(user)
    .then( newUser => {
      userDB.get(newUser.id)
        .then( user => {
          res.status(200).json(user)
        })
    }).catch( err => {
      res.status(400).json({message: 'unable to create a new user'})
    })
})

//updating a user
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  userDB.update(id, changes)
    .then( count => {
      if(count) {
        res.status(200).json({message: 'successfully updated the user'})
      } else {
        res.status(500).json({message: 'failed to update the user'})
      }
    }).catch( err => {
      res.status(400).json({message: 'unable to processs an update'})
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  userDB.remove(id)
    .then( count => {
      if (count) {
        res.status(200).json({message: 'successfully deleted the user'})
      } else {
        res.status(500).json({message: 'unable to delete the user'})
      }
    }).catch( err => {
      res.status(400).json({message: 'unable to process a delete'})
    })
})

module.exports = router