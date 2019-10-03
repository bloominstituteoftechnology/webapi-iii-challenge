const express = require('express');
const userDB  = require('./userDb');
const postDB = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  userDB.insert(req.body)
    .then(id => res.status(201).json({...id, ...req.body}))
    .catch(err => res.status(500).json({ message: "Error saving to database"}));
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  let newUser = {...req.body, user_id: req.user.id}
  postDB.insert(newUser)
    .then(id => res.status(201).json({...newUser, postedBy: req.user.name}))
    .catch(err => res.status(500).json({ message: "Error saving to database"}));
});

router.get('/', (req, res) => {
  userDB.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: "Error retrieving from database"}));
});

router.get('/:id', validateUserId, (req, res) => {
  userDB.getById(req.user.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: "Error retrieving from database"}));
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDB.getUserPosts(req.user.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: "Error retrieving from database"}));
});

router.delete('/:id', validateUserId, (req, res) => {
  userDB.remove(req.user.id)
    .then(success => res.status(201).json({message: "User succesfully deleted"}))
    .catch(err => res.status(500).json({message:"Error deleting from database"}));
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  userDB.update(req.user.id, req.body)
    .then(records => res.status(200).json({...req.user, ...req.body}))
    .catch(err => res.status(500).json({message:"Error modifying database"}));
});

//custom middleware
function validateUserId(req, res, next) {
  const id = req.params.id;
  userDB.getById(id)
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
  } else if (!req.body.name) {
    res.status(400).json({message: "missing required name field"});
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({message: "missing post data"});
  } else if (!req.body.text) {
    res.status(400).json({message: "missing required text field"});
  } else {
    next();
  }
};

module.exports = router;
