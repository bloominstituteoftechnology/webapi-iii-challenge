const express = require('express');
const postModel = require('./postModel');


const router = express.Router();


// All Posts
router.get('/', (req, res) => {
  postModel.get().then(posts => {
    res.status(200).json(posts)
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error getting posts'})
  });
})


// Add Post
router.post('/', (req, res) => {
  const { userId, text } = req.body;
  !text || !userId ?
  res.status(400).json({message: 'You need a userId and content'}) : null
  const body = {text, userId}
  postModel.insert(body)
  .then(postId => {
    res.status(200).json(postId)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({messege: 'The post could not added'});
  });
});


// Delete Post
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  postModel.remove(id)
    .then(users => {
      users === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error removing post'})
    });
})


// Update Post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { userId, text } = req.body;
  !userId && !text ? res.status(400).json({message: "Please provide a name."}) 
  :
  null
  const body = { userId, text }
  postModel.update(id, body)
    .then(posts => {
      posts === 0 ?
      res.status(400).json({message:'This ID does not exist'})
      :
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Error updating post'})
    });
})

module.exports = router;