const express = require('express');
const router = express.Router();
const db = require('../data/helpers/tagDb.js');

// handles routes that start with: /api/users

router.get('/', (req, res) => {
    // get data
    db.get()
      // send the data
      .then(users => {
        res.json(users);
      })
      // send error if there is one
      .catch(error => {
        res.status(500).json(err);
      });
  });
  
  router.get("/:id", (req, res) => {
    db
      .get(req.params.id)
      .then(users => {
        res.json(users);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
    
  
  router.post('/', (req, res) => {
      const user = req.body;
      db.insert(user)
      .then(response => {
          res.status(201).json(response)
      })
      .catch(error => {
          res.status(500).json({ error: "The users information could not be retrieved." })
      })
  })
  
  router.delete('/:id', (req, res) => {
      const { id } = req.params;
      //const user = req;
      db.remove(id)
          .then(response => {
              res.status(200).json(user);
          })
          .catch(error => {
              res.status(500).json(error);
          })
  
     
  })
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    if (!user.tag) {
      res.status(400).json({ error: 'Tag is Required' });
    } else if (user.tag.length > 80) {
      res.status(400).json({ error: 'The Max length is 80 characters' });
    } else {
      db
        .update(id, user)
        .then(count => {
          if (count > 0) {
            db
              .get(id)
              .then(user => {
                res.status(200).json(user);
              })
              .catch(error => {
                res.status(400).json(error);
              });
          } else {
            res.status(404).json({ errorMessage: 'Tag not found' });
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
    }
  });
  
  module.exports = router;
  