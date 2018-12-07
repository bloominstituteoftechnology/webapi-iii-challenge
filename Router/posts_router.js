const express = require('express');
const postDb = require('../data/helpers/postDb');


const router = express.Router();


//endpoint
router.get('/',(req,res) =>{
  postDb.get()
  .then(posts =>{
    res.json(posts)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:"Unable to retrieve posts "})
  })
})

router.get('/:id', (req, res)=>{
  const { id } = req.params;
    postDb.get(id)
    .then(post =>{
      if(post){
        res.json(post)
      }else{
        res
        .status(404)
        .json({message:"The post with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res
      .status(500)
      .json({message:"The post information cannot be retrieved"});
    })
})

router.post('/',(req, res) =>{
  const post = req.body 
  if(post.text && post.userId){
    postDb.insert(post)
    .then(postInfo =>{
      postDb.get(postInfo.id)
        .then(post=>{
        res.status(201).json(post)
      })
    })
    .catch(err =>{
      res
      .status(500)
      .json({message:"There was an error while saving the post to the database"})
    })
  }
  else{
  res
  .status(400)
  .json({message:" the Post body  text is missing  "})
  } 
})

router.delete('/:id', (req, res)=>{
  const { id } = req.params
  postDb.remove(id)
  .then( count =>{
    if(count){
      res.json({message:"The post has been successfully deleted"})
    }
    else{
      res
      .status(404)
      .json({message:"The post with that specific ID does not exist "})
    }
  })
  .catch(err =>{
    res.status(500).json({message:" The post could not be removed"})
  })
})


router.put('/:id',(req,res) =>{
  const { id } = req.params
  const post = req.body
  if(post.text && post.userId){
    postDb.update(id, post)
    .then(count =>{
      if(count){
        postDb.get(id).then(post =>{
          res.json(post)
        })
      }
      else{
        res
        .status(404)
        .json({message:"The post with the specified ID does not exist. "})
      }
    })
    .catch(err =>{
      res
      .status(500)
      .json({message:"The post information could not be modified."})
    })
  }
  else{
  res
  .status(400)
  .json({message:"the post body text is missing  "})
  }
  
})




module.exports = router;