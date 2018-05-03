const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postsDb = require('./data/helpers/postDb.js');

const router = express.Router();

// only cares about urls beginning with: /api/users
// router.get('/', (req, res, next) => {
//   res.json({message: 'hello world!'})
// })
router.get('/', (req, res) => {
  userDb.get()
    .then(users => {
      postsDb.get()
        .then(posts => {
          users.map(user => {
            user.posts = [];
            posts.map((post) => {
              if(post.userId === user.id){
                user.posts.push(post);
              }
            })
          })
          res.json(users);
        })
    });
})
router.get('/:id', (req, res) => {
  const {id} = req.params;
  userDb.get(id)
    .then(user => {
      userDb.getUserPosts(id)
        .then(posts => {
          user.posts = [...posts];
          res.json(user);
        })
    })
})
router.post('/', (req, res) => {
  const {name} = req.body;
  console.dir(name);
  userDb.insert('hello world');
})

module.exports = router;
