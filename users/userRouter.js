const express = require('express');

const router = express.Router();
const upperCase = require("../middleware/upperCase.js");
const userDb = require("../data/helpers/userDb.js");

router.get('/', (req, res) => {
    userDb.get()
    .then( users =>
        res.status(200).json(users))
    .catch( (error) => 
        res.status(500).json({ message: 'could not get users', error })
    )
  });
  
  router.get('/userpost/:id', (req, res) => {
    const {id} = req.params;
    userDb.getUserPosts(id)
    .then( posts =>
        res.status(200).json(posts))
    .catch( (error) => 
        res.status(500).json({ message: 'could not get users', error })
    )
  });

  router.post('/add', upperCase, (req, res) => {
    const newUser = req.body;
    console.log(newUser);

  userDb.insert(newUser)
  .then( id =>
      res.status(200).json(id))
  .catch( (error) => 
      res.status(500).json({ message: 'could not add user', error })
  )
});

router.put('/edit/:id', upperCase, (req, res) => {
    const {id} = req.params;
    const editUser = req.body;

  userDb.update(id, editUser)
  .then( id =>
      res.status(200).json(id))
  .catch( (error) => 
      res.status(500).json({ message: 'could not add user', error })
  )
});

  router.delete('/delete/:id', (req, res) => {
      const {id} = req.params;

    userDb.remove(id)
    .then( count =>
        res.status(200).json(count))
    .catch( (error) => 
        res.status(500).json({ message: 'could not delete user', error })
    )
  });

  

  module.exports = router;