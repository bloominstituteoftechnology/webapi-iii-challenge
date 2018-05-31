/* --- Dependencies --- */
// Express Dependencies
const express = require('express');
const router = express.Router();
// User Database 
const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');
const tagDb = require('../data/helpers/tagDb.js');

/* --- '/api/posts' Endpoints --- */
// POST
router.post('/', (req, res) => {
  const { title, contents } = req.body;
  // Operation
  postDb.insert({ title, contents })
    .then(result => res.json(result))
    .catch(err => {
      console.log(`'/api/posts' POST error: ${err}`);
      if (err.errno === 19) {
        res.status(400).json({ error: 'Please provide title and contents for the post.'});
      } else {
        res.status(500).json({ error: 'There was an error while saving the post to the database.'});
      }
    });
});

// GET

router.get('/', (req, res) => {
  // Operation
  postDb.get()
    .then(posts => {
      console.log('\'/\' GET posts:',posts);
      res.json(posts);
    })      
    .catch(err => {
      console.log(`'/api/posts' GET error: ${err}`);
      res.status(500).json({ error: 'The posts\' information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log('\'/:id\' GET id:',id);
  // Operation
  postDb.get(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.'});
      } else {
        res.json(post);
      }
    })
    .catch(err => {
      console.log(`'/api/posts/${id} GET error: ${err}`);
      res.status(500).json({ error: "The post information could not be retrieved." });
    })
})

router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  // Operation
  userDb.getUserPosts(userId)
    .then(posts => {
      console.log(`'/api/posts/user/${userId}' GET posts:`,posts);
      res.json(posts);
    })
    .catch(err => {
      console.log(`'/api/posts/user/${userId}' GET error:`,err);
      res.status(500).json({ error: "Unable to retrieve posts from user." });
    })
})

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // Operation
  postDb.get(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.'});
      } else {
        postDb.remove(id)
          .then(count => {
          if (count === 1) {
            // tagDb.removeByPostId(id)
            //   .then(count => {
            //     console.log(`'/api/posts/id' TAGS REMOVE count: ${count}`);
            //     res.json(post);
            //   })
            //   .catch(err => console.log(`tagDb.removeByPostId(${id}) error:`, err));
            res.json(post);
            
          } else if ( count === 0) {
            res.status(500).json({ message: "The post could not be removed" });
          } else {
            res.status(500).json({ message: "Serious Database Error. Contact administrator."});
          }
        })
        .catch(err => {
          console.log(`'/api/posts/${id}' DELETE error:`,err);
          res.status(500).json({ error: "The post could not be removed" })
        });
      }
    })
})

// PUT
router.put('/:id', (req, res) => {
  // Variables
  const { id } = req.params;
  const { userId, text } = req.body;
  console.log("'/api/posts/:id' PUT userId:",userId,"postInfo:",text,"id:",id);
  // Operation
  postDb.update(id, { userId, text })
    .then(count => {
      console.log("'/api/posts/:id' PUT count",count);
      if (count === 1) {
        postDb.get(id)
          .then(post => res.json(post))
          .catch(err => res.status(500).json({ error: "Post update successful, but could not retrieve record." }));
        } else if ( count === 0) {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
          res.status(500).json({ message: "Serious Database Error. Contact administrator."});
        }
    })
    .catch(err => {
      console.log("'/api/posts/:id' PUT error:",err);
      if (err.errno === 19) {
        res.status(400).json({ errorMessage: "Please provide BOTH user id and text for the post." });
      } else {
        res.status(500).json({ error: "The post information could not be modified." });
      }
  });
})

module.exports = router;