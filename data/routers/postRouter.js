const express = require('express');
const postDb = require('../helpers/postDb');

const router = express.Router();

//Post Endpoints
  //Get Posts
router.get('/', (req, res)=> {
  postDb.get()
    .then(posts => {
      res
        .status(200)
        .json(posts)
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "Failed toget posts"})
    })
})

  //Get post by id
router.get('/:id', (req, res) => {
  const {id} = req.params;
  postDb.get(id)
    .then(post=> {
      console.log(post)
      if(post){
        res
          .status(200)
          .json(post)
      } else {
        res
          .status(404)
          .json({message: "Post not found under that id"})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "Failed to get Post"})
    })
})

  //Update Post
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const post = req.body;

  if(post.text) {
    postDb.update(id, post)
      .then(count  => {
        if(count) {
          postDb.get(id)
            .then(post => {
              res
                .status(202)
                .json(post)
              }
            )
        } else {
          res
            .status(404)
            .json({message: "Invalid Post id"})
        }
      })
        .catch(err => {
          res
            .status(500)
            .json({message: "Failed to Update Post"})
        })
    } else {
      res 
        .status(400)
        .catch({message: "Missing Post text"})
    }
})

  //Delete Post
router.delete('/:id', (req, res)=> {
  const {id} = req.params;
  console.log(id);
  postDb.remove(id)
  //deletes the post but get catch message as the reponse - works now
  .then(count => {
    console.log(count)
    res
      .status(200)
      .json(count)
  })
    .catch(
      res
        .status(500)
        .json({message: "Failed to delete Post"})
    )
})

module.exports = router;