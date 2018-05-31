// Express Dependencies
const express = require('express');
const router = express.Router();
// Tag Database 
const tagDb = require('../data/helpers/tagDb.js');

/* --- '/api/tags' Routes --- */
// POST


// GET
router.get('/', (req, res) => {
  //==>
  tagDb.get()
    .then(tags => {
      res.json(tags);
    })
    .catch(err => {
      console.log("'/api/tags' GET error:",err);
      res.status(500).json({ error: "Unable to retrieve tag information." });
    });
})

router.get('/:tagId',(req, res) => {
  const { tagId } = req.params;
  //==>
  tagDb.get(tagId)
    .then(tag => {
      console.log(`'/api/tags/${tagId}' GET tag: ${tag}`);
      if (tag) {
        res.json(tag);
      } else {
        res.status(404).json({ error: "Unable to find tag by that ID." });
      }
    })
    .catch(err => {
      console.log(`'/api/tags/${tagId}' GET error:`,err);
      res.status(500).json({ error: "Unable to retrieve tag information." });
    })
})

// DELETE


// PUT
router.put('/:tagId',(req, res) => {
  const { tag } = req.body;
  //==>
  
})

module.exports = router;