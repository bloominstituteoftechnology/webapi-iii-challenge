// user routers
//
//
//


const userDb = require('./data/helpers/userDb.js')
const express = require('express')

const router = express.Router();

router.get('/', (req, res) =>{
  userDb.get()
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
module.exports = router;
