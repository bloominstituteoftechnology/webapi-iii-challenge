const express = require('express');
const postDB = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.post('/:userID/', validatePost, (req, res) => {
  const postInfo = {...req.body, user_id: req.params.userID}
  postDB.insert(postInfo) 
    .then (post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err, postInfo)
    })
});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePost(req, res, next) {
  if (req.body) {
    req.body.text ? next() : res.status(400).json({message: 'missing required text field'})
  } else {
    res.status(400).json({message: 'missing post data'})
  }
};


module.exports = router;