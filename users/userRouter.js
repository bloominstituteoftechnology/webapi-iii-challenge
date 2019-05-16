const express = require('express');
const Posts = require('./postDb');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
      const posts = await Posts.get();
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({
          message: "This post could not be retrieved"
    })
  }
});

router.get('/:id', async(req, res) => {
    try{
      const post = await Posts.getById(req.params.id);
    if(post) {
        res.status(200).json(post);
    } else {
        res.status(404),json({message: 'This post was not found'});
    }

    } catch(error) {
      console.log(error);
        res.status(500).json({
          message: 'Error retrieving the post',
    });
  }
});

router.delete('/:id', async(req, res) => {
    try{
      const postId = await Posts.remove(req.params.id);
    if(postId) {
        res.status(200).json({message: 'This post has been deleted'});
    } else {
        res.status(404).json({message: 'This post is not found'});
    }

    } catch(error) {
      console.log(error);
      res.status(500).json({
        message: 'There was an error removing the hub',
    });
  }
});

router.put('/:id', validatePost, async(req, res) => {
    try{
        const post = await Posts.update(req.params.id, req.body);
    if(post) {
          res.status(200).json(post);
    } else {
          res.status(404).json({message: 'This post is not found'});
    }

    } catch(error) {
      console.log(error);
        res.status(500).json({
          message: 'There was an error updating the post',
    });
  }
});

  function validatePost(req, res, next) {
    if(req.body && Object.keys(req.body).length) {
        next();
    } else {
        res.status(404).json({message: 'Please include the requested body'});
    }

};

module.exports = router;