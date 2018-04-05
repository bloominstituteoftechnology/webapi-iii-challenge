const express = require('express');
const router = express.Router();
const userDb = require('./data/helpers/userDb.js');


router.get('/api/users', (req, res) => {
    userDb
      .get()
      .then(users => res.json(users))
      .catch(error =>
        res.status(500).json({
          error: 'There was an error while retrieving users'
        })
      );
  });

  router.post('/api/users',(req,res) =>{
    const post=req.body;  
    userDb
      .insert(post)
      .then(response =>{
          res.status(201).json(post)
      })
      .catch(error =>{
          res.status(500).json({error:'Error saving the user'

          })
      })
  })



module.exports =router;