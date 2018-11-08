
const express = require('express')
const postsDb = require('../data/helpers/postDb.js')
const router = express.Router();


router.get('/', (req, res) => {
  postsDb.get()
    .then(posts => {
      res.status(200).json(posts)
    })
   .catch(error => {
     res.status(500).json({message: `there was a problem getting posts`})
   })
})


router.get('/:id', (req, res) => {
  postsDb.get(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
   .catch(error => {
     res.status(500).json({message: `there was a problem getting posts`})
   })
})

router.post('/', (req, res) => {
  const postData = req.body;
  if(postData.text.length === 0) {
    res.status(500).json({message: 'no empty strings'})
  } else {
    postsDb.insert(postData).then(newPost => {
      postsDb.get(newPost.id).then(post => {
        res.status(201).json(post);
      })
    })
     .catch(error => {
       res.status(500).json({message: 'there was a problem creating post'})
   })
  }
})

router.delete('/:id', (req, res) => {
    postsDb.remove(req.params.id).then(count => {
      if(count){
        res.status(200).json({message: `${count} post deleted`})
      } else {
        res.status(404).json({message: `post not found`})
      }
    })
     .catch(error => {
       res.status(500).json({message: 'there was a problem deleting post'})
   })
})

router.put('/:id', (req, res) => {
  console.log(req.body)
  const {id} = req.params;
  const changes = req.body;
  postsDb.update(id, changes).then(count => {
      res.status(200).json({message: `${count} post updated`})
  })
})

module.exports = router;
