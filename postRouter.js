const express = require('express');
const router = express.Router();

// App Requirements:
const posts = require('./data/helpers/postDb');
const user = require('./data/helpers/userDb');
const customMW = require('./middleware.js');

// Middleware:
//router.use(customMW.fixCase);

//-------- Post Info: --------//
// GET:
router.get( '/', (req, res) => {
  posts.get()
    .then( listPosts => {
      res.json(listPosts);
    })
    .catch( err => {
      res.status(500).json({ error: "The post information could not be retrieved."});
    });
});

router.get( '/:id', (req, res) => {
  const { id } = req.params;
  posts.get(id)
    .then( listPost => {
      // Check for empty result
      if( listPost ){
        res.json(listPost);
      } else {
        res.status(404).json({ message: "The post does not exist."});
      }
    })
    .catch( err => {
      res.status(500).json({ error: "The post information could not be retrieved."});
    });
});

// POST:
router.post( '/', customMW.checkValidUser, (req, res) => {
  const newPost = req.body;

  // Check for empty name:
  if( !newPost.text || !newPost.userId ){
    res.status(400).json({ error: "Please provide the text for the post and the userId."});
  } else {
    posts.insert(newPost)
    .then( postId => {
      posts.get(postId.id)
        .then( showPost => {
          res.json(showPost);
        });
    })
    .catch( err => {
      res.status(500).json({ error: "There was an error adding the post."});
    });

  }
});
/*
// PUT:
router.put( '/:id', (req, res) => {
  const postBody = req.body;
  const { id } = req.params;

  if( postBody.text || postBody.userId ){
    posts.update(id, postBody)
      .then( () => {
        posts.get(id)
          .then( showPost => {
            res.json(showPost);
          });
      })
      .catch( err => {
        res.status(500).json( {error: "There was an error updating the post."} );
      });
  } else {
    res.status(400).json({ error: "Please provide the text for the post and the userId." });
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
*/
module.exports = router;
