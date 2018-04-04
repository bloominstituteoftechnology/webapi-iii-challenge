const express = require('express');

const router = express.Router();

const db= require('../data/helpers/postDb.js');

router.get('/', (req, res) => {
    db
 
      .get()
      .then(posts => {
          res.json(posts);
      })
      .catch(error => {
          res.status(500).json({ error: "Unable to retrieve posts." });
      })
 })
 
 router.get('/:id', (req, res) => {
     const { id } = req.params;
     
     db
 
      .get(id)
      .then(post => {
          if (post === undefined) {
              res.status(404).json({ error: "Post ${id} could not be found"});
          } else {
              res.status(200).json(post)
          }       
      })
      .catch(error => {
          res.status(500).json({ error: "Could not retrieve post information." });
      })
 })

module.exports = router;