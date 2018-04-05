const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js');

// handles routes that start with: /api/tags

// get
router.get(`/`, (req, res) => {
  db
    .get()
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
    .then(tag => {
      if(Object.keys(tag).length > 0){
        res
          .status(200)
          .json(tag); 
      }else{
        res
        .status(404)
        .json({ message: `The tag does not exist.` }); // tag doesn't exist
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `The tag information could not be retrieved. Internal server error!` }); // database error
    });
});

//post
router.post(`/`, (req, res) => {
  const newTag =  req.body !== undefined ? req.body : {};

  // check if name is set
  if(newTag.tag === undefined){
    res 
      .status(400)
      .json({ errorMessage: `Please provide a tag.` })
      return;
  }

  // check the tag character length is less than 80
  if(newUser.tag.length > 80){
    res 
      .status(400)
      .json({ errorMessage: `Please the tag can only have a max characters of 80.` })
      return;
  }

  //insert it in the database
  db
    .insert(newTag)
    .then(response => {
      db
        .get(response.id)
        .then(tag => {
          if(Object.keys(tag).length > 0){
            res
              .status(200)
              .json(tag);
          }else{
            res
              .status(404)
              .json({ message: `The tag was not created.` }); // tag doesn't exist, so was not created
          }
        });
    }).catch(err => {
      res
        .status(500)
        .json({error: `There was an error while saving the tag to the database. Internal server error`});
    });
});

//delete
router.delete(`/:id`, (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(response => {
      if(Object.keys(response).length > 0){
        // make a copy of the tag
        const tag = { ...response };
        db
          .remove(id)
          .then(count => {
            res
              .status(200)
              .json(tag); // send the tag deleted back with the response
          });
      }else{
        res
          .status(404)
          .json({ message: `The tag was not deleted.` }); // tag doesn't exist?? somehow!!
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `The tag could not be removed. Internal server error!` }); // database error
    });  
});

//put
router.put(`/:id`, (req, res) => {
  const { id } = req.params;
  const tagUpdate = req.body ? req.body : {};

  // update
  db
    .update(id, tagUpdate)
    .then(count => {
        if(count > 0){
          // update done
          db
          .get(id)
          .then(updatedTag => {
            if(Object.keys(updatedTag).length > 0){
              res
                .status(200)
                .json(updatedTag); 
            }else{
              res
                .status(400) // check if this is correct?
                .json({ message: `Error encountered` }); // update occured but an error happened
            }
          });
        }else{
          res
            .status(404)
            .json({ message: `The tag was not updated.` }); // nothing was updated
        }
    })
    .catch(error => {
      res 
        .status(500)
        .json({ error: `The tag information could not be modified.` }); // database error
    });
});

module.exports = router;