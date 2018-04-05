const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb.js');

router.get('/', (req, res) => {
  db.get()
  .then(posts => res.json(posts))
  .catch(error => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get(id)
  .then(post => res.json(post))
  .catch(error => {
    res.status(500).json({ error: "The posts information could not be retrieved, or doesn't exist" })
  });
});

router.get('/tags/:id', (req, res) => {
  const { id } = req.params;
  
  db.getPostTags(id)
  .then(response => {
    if (response.length) {
      res.status(200).json(response);  
    } else {
      res.status(404).json({ message: "This post does not contain any tags."})
    }
  })
  .catch(error => {
    res.status(500).json({ error: "Tags information cannot be retrieved." })
  });
});

router.post('/', (req, res) => {
  const text = req.body.text;
  const userId = req.body.userId;
  const post = req.body;
  if (!text || !userId) {
    res.status(400).json({ errorMessage: "Please provide text and user-id for the post." })
    return;
  }
  
  db.insert(post)
  .then(response => {
    
    db.get(response.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => console.log(error));
    
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the post to the database." })
  });
  
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const text = req.body.text;
  const post = req.body;
  
  if (!text) {
    res.status(400).json({ errorMessage: "Please provide text for the post." })
    return;
  }
  
  db.update(id, post)
  .then(updatedPost => {
    if(updatedPost) {
      db.get(id)
      .then(post => res.json(post));
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  }).catch(error => {
    res.status(500).json({ error: "The post information cannot be modified." });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let post;
  
  db.get(id)
  .then(response => {
    post = { ...response }
    
    db.remove(id)
    .then(response => {
      if (response) {
        res.json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
    
  })
  .catch(error => {
    res.status(500).json({ error: "The post could not be removed" });
  });
  
});




module.exports = router;