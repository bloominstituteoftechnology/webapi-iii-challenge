const express = require('express');
const router = express.Router();

// App Requirements:
const users = require('./data/helpers/userDb');
const customMW = require('./middleware.js');

// Middleware:
router.use(customMW.fixCase);

//-------- User Info: --------//
// GET:
router.get( '/', (req, res) => {
  users.get()
    .then( listUsers => {
      res.json(listUsers);
    })
    .catch( err => {
      res.status(500).json({ error: "The user information could not be retrieved."});
    });
});

router.get( '/:id', (req, res) => {
  const { id } = req.params;
  users.get(id)
    .then( listUser => {
      // Check for empty result
      if( listUser ){
        res.json(listUser);
      } else {
        res.status(404).json({ message: "The user does not exist."});
      }
    })
    .catch( err => {
      res.status(500).json({ error: "The user information could not be retrieved."});
    });
});

// Get posts for userId. Using slightly different path here:
router.get( '/posts/:id', customMW.checkValidUser, (req, res) => {
  const { id } = req.params;
  users.getUserPosts(id)
    .then( listPosts => {
      // Check for empty result
      if( listPosts.length > 0 ){
        res.json(listPosts);
      } else {
        res.status(404).json({ message: "There are no posts found for user."});
      }
    })
    .catch( err => {
      res.status(500).json({ error: "Could not retrieve posts by userId."});
    });
});

// POST:
router.post( '/', (req, res) => {
  const user = req.body;

  // Check for empty name:
  if( !user.name ){
    res.status(400).json({ error: "Please provide the name for the user."});
  } else {
    users.insert(user)
    .then( userId => {
      users.get(userId.id)
        .then( showUser => {
          res.json(showUser);
        });
    })
    .catch( err => {
      res.status(500).json({ error: "There was an error adding the user."});
    });

  }
});

// PUT:
router.put( '/:id', (req, res) => {
  const user = req.body;
  const { id } = req.params;

  if( user.name ){
    users.update(id, user)
      .then( () => {
        users.get(id)
          .then( showUser => {
            res.json(showUser);
          });
      })
      .catch( err => {
        res.status(500).json( {error: "There was an error updating the user."} );
      });
  } else {
    res.status(400).json({ error: "Please provide the name for the user." });
  }
});

// DELETE:
router.delete( '/:id', (req, res) => {
  const { id } = req.params;

  users.remove(id)
    .then( () => {
      res.json({ message: `User ID ${id} deleted.`});
    })
    .catch( err => {
      res.status(500).json({error: "There was an error deleting the user."});
    });
});

module.exports = router;
