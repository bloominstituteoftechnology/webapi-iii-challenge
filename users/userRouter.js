const express = require('express');
const router = express.Router();
const userDB = require('./userDb')

router.use('/:id', validateUserID)

router.get('/', (req, res) => {
  userDB.get()
    .then( (users) => {
      res.status(200).json(users)
    })
})

router.get('/:id', (req, res) => {
  const user = req.user;
  res.status(200).json(user)
})

router.get('/:id/posts', (req, res) => {
  userDB.getUserPosts(req.params.id)
    .then( posts => {
      res.status(200).json(posts)
    })
    .catch(err => console.log(err))
})

router.post('/', validateUser, (req, res) => {
  userDB.insert(req.body)
    .then( (user) => {
      res.status(201).json(user)
    })
    .catch( err => {
      res.status(500).json({message: 'Failed to add user to database'})
    }
)})


function validateUserID(req, res, next) {
  const id = req.params.id;

    userDB.getById(id)
      .then( (user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({message: 'invalid user id'})
        }
      });
}

function validateUser(req, res, next) {
  if (req.body) {
    req.body.name ? next() : res.status(400).json({message: 'missing required name field'})
  } else {
    res.status(400).json({message: 'missing user data'})
  }
};

module.exports = router;
