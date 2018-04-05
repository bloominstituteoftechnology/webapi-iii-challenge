const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb.js');

// handles routes that start with: /api/posts

// get
router.get(`/`, (req, res) => {
  db
    .get()
    .then(posts => {
      if(posts.length > 0){ // checks if any posts were found
        res
          .status(200)
          .json(posts);
      }else{
        res
          .status(404)
          .json({ message: `No posts found!` }); // no posts found
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `The posts could not be retrieved.` }); // database error
    });
});

// get
router.get(`/:id/tags`, (req, res) => {
  const { id } = req.params;
  db
    .getPostTags(id)
    .then(tags => {
      if(tags.length > 0){ // checks if any tags were found
        res
          .status(200)
          .json(tags);
      }else{
        res
          .status(404)
          .json({ message: `No tags found!` }); // no tags found
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `The tags could not be retrieved.` }); // database error
    });
});

//get by id
router.get(`/:id`, (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(post => {
      if(Object.keys(post).length > 0){
        res
          .status(200)
          .json(post); 
      }else{
        res
        .status(404)
        .json({ message: `The post does not exist.` }); // post doesn't exist
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `The post information could not be retrieved. Internal server error!` }); // database error
    });
});

//post
router.post(`/`, (req, res) => {
  const newPost =  req.body !== undefined ? req.body : {};

  // check if userId or text is set
  if(newPost.userId === undefined && newPost.text === undefined){
    res 
      .status(400)
      .json({ errorMessage: `Error encountered with your submition!.` })
      return;
  }

  //insert it in the database
  db
    .insert(newPost)
    .then(response => {
      db
        .get(response.id)
        .then(post => {
          if(Object.keys(post).length > 0){
            res
              .status(200)
              .json(post);
          }else{
            res
              .status(404)
              .json({ message: `The post was not created.` }); // post doesn't exist, so was not created
          }
        });
    }).catch(err => {
      res
        .status(500)
        .json({error: `There was an error while saving the post to the database. Internal server error`});
    });
});

//delete
router.delete(`/:id`, (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(response => {
      if(Object.keys(response).length > 0){
        // make a copy of the post
        const post = { ...response };
        db
          .remove(id)
          .then(count => {
            res
              .status(200)
              .json(post); // send the post deleted back with the response
          });
      }else{
        res
          .status(404)
          .json({ message: `The post was not deleted.` }); // post doesn't exist?? somehow!!
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `The post could not be removed. Internal server error!` }); // database error
    });  
});

//put
router.put(`/:id`, (req, res) => {
  const { id } = req.params;
  const postUpdates = req.body ? req.body : {};

  // update
  db
    .update(id, postUpdates)
    .then(count => {
        if(count > 0){
          // update done
          db
          .get(id)
          .then(updatedPost => {
            if(Object.keys(updatedPost).length > 0){
              res
                .status(200)
                .json(updatedPost); 
            }else{
              res
                .status(400) // check if this is correct?
                .json({ message: `Error encountered` }); // update occured but an error happened
            }
          });
        }else{
          res
            .status(404)
            .json({ message: `The post was not updated.` }); // nothing was updated
        }
    })
    .catch(error => {
      res 
        .status(500)
        .json({ error: `The post information could not be modified.` }); // database error
    });
});

module.exports = router;