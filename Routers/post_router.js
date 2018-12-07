const express = require("express");
const router = express.Router();
const postDb = require("../data/helpers/postDb.js");
const userDb = require("../data/helpers/userDb.js");

//post db requests
//get all posts
router.get("/", (req, res) => {
   postDb.get()
      .then(posts => {
         res.json(posts);
      })
      .catch(err => {
         res.status(404).json({error: "posts not found"});
      });
});

//get post by id
router.get("/:id", (req, res) => {
   const id = req.params.id;
   postDb.get(id)
      .then(post => {
         res.json(post);
      })
      .catch(err => {
         res.status(500).json({error: "Post does not exist"})
      });
});

//add post
router.post("/", (req, res) => {
   const post = req.body;
   if(post.text && post.userId) {
      postDb.insert(post)
         .then(postId => {
            postDb.get(postId.id)
               .then(post => { 
                  res.status(201).json(post) 
               })
         })
         .catch(err => {
            res.status(500).json({error: "failed to add post"});
         })
   } else {
      res.status(400).json({error: "Please provide post text and author"});
   }
});

//delete post
router.delete("/:id", (req, res) => {
   const {id} = req.params;
   postDb.remove(id)
      .then(count => {
         count ? res.json({message: "post deleted"}) : res.status(404).json({error: "post does not exist"})
      })
      .catch(err => {
         res.status(500).json({error: "error deleting post"});
      });
});

//update post
router.put("/:id", (req, res) => {
   const {id} = req.params;
   const post = req.body;
   if(post.text && post.userId){
      postDb.update(id, post)
         .then(count => {
            if(count) {
               postDb.get(id)
                  .then(post => {
                     res.json(post);
                  })
            } else {
               res.status(404).json({error: "post not found"});
            }
         })
         .catch(err => {
            res.status(500).json({error: "error updating post"})
         });
   } else {
      res.status(400).json({error: "please provide post text and author"});
   }
});

module.exports = router;