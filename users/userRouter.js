const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js');

// handles routes that start with: /api/users

// get
router.get(`/`, (req, res) => {
  db
    .get()
    .then(users => {
      if(users.length > 0){ // checks if any users were found
        res
          .status(200)
          .json(users);
      }else{
        res
          .status(404)
          .json({ message: `No users found!` }); // no users found
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `The users could not be retrieved.` }); // database error
    });
});

// get
router.get(`/:id/posts`, (req, res) => {
  const { id } = req.params;
  db
    .getUserPosts(id)
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

//get by id
router.get(`/:id`, (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(user => {
      if(Object.keys(user).length > 0){
        res
          .status(200)
          .json(user); 
      }else{
        res
        .status(404)
        .json({ message: `The user does not exist.` }); // user doesn't exist
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `The user information could not be retrieved. Internal server error!` }); // database error
    });
});

//post
router.post(`/`, (req, res) => {
  const newUser =  req.body !== undefined ? req.body : {};

  // check if name is set
  if(newUser.name === undefined){
    res 
      .status(400)
      .json({ errorMessage: `Please provide a name for the user.` })
      return;
  }

  // check the user character length is less than 128
  if(newUser.name.length > 128){
    res 
      .status(400)
      .json({ errorMessage: `Please the name can only have a max characters of 128.` })
      return;
  }
  
  //insert it in the database
  db
    .insert(newUser)
    .then(response => {
      db
        .get(response.id)
        .then(user => {
          if(Object.keys(user).length > 0){
            res
              .status(200)
              .json(user);
          }else{
            res
              .status(404)
              .json({ message: `The user was not created.` }); // user doesn't exist, so was not created
          }
        });
    }).catch(err => {
      res
        .status(500)
        .json({error: `There was an error while saving the user to the database. Internal server error`});
    });
});

//delete
router.delete(`/:id`, (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(response => {
      if(Object.keys(response).length > 0){
        // make a copy of the user
        const user = { ...response };
        db
          .remove(id)
          .then(count => {
            res
              .status(200)
              .json(user); // send the user deleted back with the response
          });
      }else{
        res
          .status(404)
          .json({ message: `The user was not deleted.` }); // user doesn't exist?? somehow!!
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `The user could not be removed. Internal server error!` }); // database error
    });  
});

//put
router.put(`/:id`, (req, res) => {
  const { id } = req.params;
  const userUpdates = req.body ? req.body : {};

  // update
  db
    .update(id, userUpdates)
    .then(count => {
        if(count > 0){
          // update done
          db
          .get(id)
          .then(updatedUser => {
            if(Object.keys(updatedUser).length > 0){
              res
                .status(200)
                .json(updatedUser); 
            }else{
              res
                .status(400) // check if this is correct?
                .json({ message: `Error encountered` }); // update occured but an error happened
            }
          });
        }else{
          res
            .status(404)
            .json({ message: `The user was not updated.` }); // nothing was updated
        }
    })
    .catch(error => {
      res 
        .status(500)
        .json({ error: `The user information could not be modified.` }); // database error
    });
});

module.exports = router;