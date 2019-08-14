const express = require('express');

const router = express.Router();

const db = require('./userDb.js');


router.post('/', validatePost, (req, res) => {
  //datatype
  //status code
  //responce

  const { name, bio } = req.body;

  db.insert({name, bio})
  .then((id) => {
    if(id){
      console.log(created);
      res.status(201).json({id})
    } else {
      res.status(400).json({
        errorMessage: 'Please provide name and bio for the user.'
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      error: 'There was an error while saving the user to the database',
    })
  })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', validateUserId, (req, res) => {

});

router.get('/:id/posts', validateUserId, (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {

});

router.put('/:id', validateUserId, (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  db.getById(id)
    .then( user => {
      if(user){
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "server error!", err})
    })
};

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  }
};

function validatePost(req, res, next) {
  if( !req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  }
};

module.exports = router;
