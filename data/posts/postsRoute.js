const express = require('express');
const router = express.Router();

const postDb = require('./data/helpers/postDb.js');
 

router.get('/api/post', (req, res) => {
    postDb
      .get()
      .then(posts => res.json(post))
      .catch(error =>
        res.status(500).json({
          error: 'There was an error while retrieving users'
        })
      );
  });





server.post('/api/posts',(req,res) =>{
    const post=req.body;  
    postDb
      .insert(post)
      .then(response =>{
          res.status(201).json(post)
      })
      .catch(error =>{
          res.status(500).json({error:'Error saving the post'

          })
      })
  })





  module.exports = router;