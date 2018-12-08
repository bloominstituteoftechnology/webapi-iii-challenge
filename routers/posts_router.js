const express = require('express');
const router = express.Router();

//Database
const dbPosts = require('../data/helpers/postDb');

//CRUD METHODS FOR ALL POSTS
router.get('/', (req,res) => {
    dbPosts.get()
           .then( posts => {
                console.log(posts);
                res.json(posts);
           })
           .catch(err => {
                res.status(500).json({errorMessage: ""})
           });
});

router.get('/:id', (req,res) => {
    const {id} = req.params;
    console.log(id);
    dbPosts.get(id)
           .then( post => {
               if(post) { 
               res.json(post);
               }
                else {
                // 404 invalid ID.
                    res.status(404).json({ message: "The post with the specified ID does not exist."});
               }
           })
           .catch(err => {
              res.status(500).json({errorMessage: "The user information could not be retrieved."})
         });
});

router.post('/', (req,res) => {
       const post = req.body;
       const {text, userId} = req.body;
       console.log('Line number 157:', post)
       if(text && userId) {
            dbPosts.insert(post)
                   .then(postId => {
                       dbPosts.get(postId.id)
                              .then(newPost => {
                                   console.log('Line 164:', newPost)
                                   res.status(201).json(newPost);
                              })
                              .catch(err => {
                                   res.status(404).json({errorMessage: "There is not post with the specific ID"});
                              })
                   }).catch(err => {
                         res.status(500).json({errorMessage:"Something went wrong adding the post to the router"});
                   });
       } else {
            res.status(400).json({errorMessage: "Please enter the text-- text is required."})
       }
});

router.put('/:id', (req,res) => {
    const { id } = req.params;
    const post = req.body;
    dbPosts.update(id, post)
           .then(count => {
                if(count) {
                     dbUsers.get(id)
                            .then( newPost => {
                                 res.status(201).json(newPost);
                            })
                } else {
                    res.status(404).json({errorMessage:"Cannot update post with this ID"})
                }
           })
            .catch(err => {
                 res.status(500).json({errorMessage: "Could not update the post"})
            });
});

router.delete('/:id', (req,res)=> {
      const {id} = req.params;
      dbPosts.remove(id)
             .then(count => {
                  if(count) {
                       res.json({errorMessage:"Successfully deleted the post"});
                  } else {
                       res.status(404).json({errorMessage:"Could not find the post with this ID"});
                  }
             })
             .catch(err => {
                  res.status(500).json({errorMessage:"Something went wrong--could not delete the post "});
             });
});

module.exports = router;