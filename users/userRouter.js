const express = require('express');

const router = express.Router();

router.post('/', validateUser, (req, res) => {

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

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
  const id = req.params.id;
  userDB.findById(id)
    .then(foundUser => {
      if (foundUser) {
        req.user = foundUser;
        next();
      } else {
        res.status(400).json({message: "invalid user id"});
      }
    })
};

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({message: "missing user data"});
  } else if (!req.name) {
    res.status(400).json({message: "missing required name field"});
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({message: "missing user data"});
  } else if (!req.text) {
    res.status(400).json({message: "missing required text field"});
  } else {
    next();
  }
};

module.exports = router;
