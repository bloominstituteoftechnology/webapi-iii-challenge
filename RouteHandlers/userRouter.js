const express = require('express');
const userDB = require('../data/helpers/userDb.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    userDB.get()
    .then(users => {
        res.json(users);
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    userDB.get(id)
    .then(user => {
        res.json(user)
    })
})

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;

    userDB.get(id)
    .then(user => {
        userDB.getUserPosts(user.id)
        .then(posts => {
            user.posts = [...posts];
            res.json(user)
        })
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    userDB.get(id)
    .then(user => {
        userDB.remove(user.id)
        .then(() => {
            res.json(user);
        })
    })
})

// userDb.insert() doesnt work
router.post('/', (req, res) => {
    const name = req.body
    userDb.insert(name)
    .then(response => {
      userDb.get(response.id)
      .then(user => {
        res.json(user);
      })
    })
  })
  
  // userDb.update() doesnt work
  router.put('/:id', (req, res) => {
    const {id} = req.params;
    const update = req.body;
    userDb.update(id, update)
    .then(response => {
      userDb.get(id)
      .then(updatedUser => {
        res.json(updatedUser);
      })
    })
  })



  module.exports = router;