// Express Dependencies
const express = require('express');
const router = express.Router();
// User Database 
const db = require('../data/helpers/postDb.js');

/* --- Post Routes --- */
// POST
router.post('/', (req, res) => {
  const { title, contents } = req.body;

  db.insert({ title, contents })
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
  db.get()
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
  db.get(id)
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

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.get(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.'});
      } else {
        db.remove(id)
          .then(count => {
          if (count === 1) {
            res.json(post);
          } else if ( count === 0) {
            res.status(500).json({ message: "The post could not be removed" });
          } else {
            res.status(500).json({ message: "Serious Database Error. Contact administrator."});
          }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }));
      }
    })
})

// PUT
router.put('/:id', (req, res) => {
  // Variables
  const { id } = req.params;
  const { userId, text } = req.body;
  console.log("'/api/users/:id' PUT userId:",userId,"postInfo:",text,"id:",id);
  // Operation
  db.update(id, { userId, text })
    .then(count => {
      console.log("'/api/users/:id' PUT count",count);
      if (count === 1) {
        db.get(id)
          .then(post => res.json(post))
          .catch(err => res.status(500).json({ error: "Post update successful, but could not retrieve record." }));
        } else if ( count === 0) {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
          res.status(500).json({ message: "Serious Database Error. Contact administrator."});
        }
    })
    .catch(err => {
      console.log("'/api/users/:id' PUT error:",err);
      if (err.errno === 19) {
        res.status(400).json({ errorMessage: "Please provide BOTH user id and text for the post." });
      } else {
        res.status(500).json({ error: "The post information could not be modified." });
      }
  });
})

module.exports = router;