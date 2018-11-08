// user routers
//
//
//


const userDb = require('../data/helpers/userDb.js')
const express = require('express')

const router = express.Router();
const upperCaser = require('../middleware/upperCaser.js')

router.get('/', (req, res) =>{
  userDb.get()
    .then(posts => {
      res.status(200).json(posts)
    })
   .catch(error => {
     res.status(500).json({message: `there was a problem getting posts`})
   })
})

router.get('/:id', (req, res) =>{
  userDb.get(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
   .catch(error => {
     res.status(500).json({message: `there was a problem getting posts`})
   })
})

router.post('/', (req, res) => {
  const userData = req.body;
  if(userData.name.length === 0) {
    res.status(500).json({message: 'no empty strings'})
  } else {
    userDb.insert(userData).then(newUser => {
      userDb.get(newUser.id).then(user => {
        res.status(201).json(user);
      })
    })
     .catch(error => {
       res.status(500).json({message: 'there was a problem creating post'})
   })
  }


})

router.delete('/:id', (req, res) => {
    userDb.remove(req.params.id).then(count => {
      if(count){
        res.status(200).json({message: `${count} user deleted`})
      } else {
        res.status(404).json({message: `user not found`})
      }
    })
     .catch(error => {
       res.status(500).json({message: 'there was a problem deleting post'})
   })
})

router.put('/:id', (req, res) => {
  console.log(req.body)
  const {id} = req.params;
  const changes = req.body;
  userDb.update(id, changes).then(count => {
      res.status(200).json({message: `${count} post updated`})
  })
})



module.exports = router;
