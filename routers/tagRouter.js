// ##### Tags

// * id: number, no need to provide it when creating tags, the database will generate it.
// * tag: string up to 80 characters long, must be a unique value.

const express = require('express');
const router = express.Router();
const db = require('../data/helpers/tagDb.js');

// handles routes that start with: /api/tags

router.get('/', (req, res) => {
    // get data
    db.get()
      // send the data
      .then(tags => {
        res.json(tags);
      })
      // send error if there is one
      .catch(error => {
        res.status(500).json(err);
      });
  });
  
  router.get("/:id", (req, res) => {
    db
      .get(req.params.id)
      .then(tags => {
        res.json(tags);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
    
  
  router.post('/', (req, res) => {
      const tag = req.body;
      db.insert(tag)
      .then(response => {
          res.status(201).json(response)
      })
      .catch(error => {
          res.status(500).json({ error: "The tags information could not be retrieved." })
      })
  })
  
  router.delete('/:id', (req, res) => {
      const { id } = req.params;
      //const tag = req;
      db.remove(id)
          .then(response => {
              res.status(200).json(tag);
          })
          .catch(error => {
              res.status(500).json(error);
          })
  
     
  })
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const tag = req.body;
    if (!tag.tag) {
      res.status(400).json({ error: 'Tag is Required' });
    } else if (tag.tag.length > 80) {
      res.status(400).json({ error: 'The Max length is 80 characters' });
    } else {
      db
        .update(id, tag)
        .then(count => {
          if (count > 0) {
            db
              .get(id)
              .then(tag => {
                res.status(200).json(tag);
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
  