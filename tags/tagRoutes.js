// Express Dependencies
const express = require('express');
const router = express.Router();
// Tag Database 
const tagDb = require('../data/helpers/tagDb.js');

/* --- '/api/tags' Routes --- */
// POST
router.post('/',(req, res) => {
  const { tag } = req.body;
  //==>
  tagDb.insert({ tag })
    .then(id => {
      console.log("'/api/tags' POST id:",id);
      res.json(id);
    })
    .catch(err => {
      console.log("'/api/tags' POST error:",err);
      res.status(500).json({ error: "Unable to add tag information." });
    });
})

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
router.delete('/:tagId',(req, res) => {
  const { tagId } = req.params;
  //==>
  tagDb.remove(tagId)
    .then(count => {
      if (count === 1) {
        res.json({ message: `Tag ${tagId} deleted.`});
        
      } else if (count === 0) {
        res.status(500).json({ message: "The tag could not be removed" });
      } else {
        res.status(500).json({ message: "Serious Database Error. Contact administrator."});
      }
    })
    .catch(err => {
      console.log(`'/api/tags/${id}' DELETE error:`,err);
      res.status(500).json({ error: "The tag could not be removed" })
    });
})

// PUT
router.put('/:tagId',(req, res) => {
  const { tagId } = req.params;
  const { tag } = req.body;
  console.log(`'/api/tags/${tagId} tagId: ${tagId} tag: ${tag}`)
  //==>
  tagDb.update(tagId, { tag })
    .then(count => {
      console.log(`'/api/tags/${tagId} PUT count: ${count}`);
      if (count === 1) {
        res.json({ message: `Update of tag ID: ${tagId} successful.`})
      }
    })
    .catch(err => {
      console.log(`'/api/tags/${tagId}' PUT error:`,err);
      res.status(500).json({ error: "Unable to update tag information." });
    })
})

module.exports = router;