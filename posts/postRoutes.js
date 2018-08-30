const express = require('express');

// const server = express(); //dont need cause of Router now

const router = express.Router();

const postDb = require('../data/helpers/postDb.js');

router.use(express.json());

router.get('/', (req, res) => {
  console.log('posts requested')
  postDb.get().then(allPosts => {
    res.status(200).json(allPosts)
  })
});

router.get('/:id', (req, res) => {
  console.log('id requested')
  postDb.get(req.params.id).then(post => {
    res.status(200).json(post)
  })
});

router.post('/', (req, res) => {
  //text is required
  //userId is required from existing user
  // if Id present say it will be disgarded
  postDb.insert(req.body)
    .then(postId => {
      res.status(200).json(postId)
    })
    .catch(err => {
      res.status(400).json(err)
    })
});

router.put('/:id', (req, res) => {
  console.log('update post')
  postDb.update(req.params.id, req.body)
  .then(count => {
    res.status(201).json(count)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  console.log('remove post')
  postDb.remove(req.params.id)
  .then( newUserId => {
    res.status(201).json(newUserId)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;
