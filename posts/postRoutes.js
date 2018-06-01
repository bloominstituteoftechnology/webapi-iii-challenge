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
  const { userId, text } = req.body;
  //==>
  postDb.insert({ userId, text })
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
  //==>
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
  //==>
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

// router.get('/user/:userId', (req, res) => {
//   const { userId } = req.params;
//   //==>
//   userDb.getUserPosts(userId)
//     .then(posts => {
//       console.log(`'/api/posts/user/${userId}' GET posts:`,posts);
//       res.json(posts);
//     })
//     .catch(err => {
//       console.log(`'/api/posts/user/${userId}' GET error:`,err);
//       res.status(500).json({ error: "Unable to retrieve posts from user." });
//     })
// })

router.get('/:id/tags', (req, res) => {
  const id = req.params.id;
  //==>
  postDb.getPostTags(id)
    .then(tags => {
      if (tags.length < 1) {
        res.status(404).json({ message: 'The post has no tags to display.'});
      } else {
        res.json(tags);
      }
    })
    .catch(err => {
      console.log(`'/:id/tags' GET error:`, error);
      res.status(500).json({ error: `Could not retrieve tags for post ${id}.` });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  //==>
  postDb.get(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.'});
      } else {
        postDb.remove(id)
          .then(count => {
          if (count === 1) {
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

// UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { userId, text } = req.body;
  console.log("'/api/posts/:id' PUT userId:",userId,"postInfo:",text,"id:",id);
  //==>
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