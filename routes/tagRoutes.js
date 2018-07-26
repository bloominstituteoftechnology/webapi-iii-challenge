const express = require('express');
const router = express.Router();

const tagDb = require('../data/helpers/tagDb.js');

//Middleware to make new tags start with uppercase letter
function uppercase(req, res, next) {
  const { tag } = req.body;
  req.body.tag = tag.charAt(0).toUpperCase() + tag.substr(1);
  next();
}

//View Tags
router.get('/', (req, res) => {
  tagDb
  .get()
  .then(tags => {
    res.status(200).json({ tags });
  })
  .catch(error => {
    res.status(500).json({ error: "Could not retreive tags"})
  })
})

//View Tag by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  tagDb
  .get(id)
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: "The tag with the specified ID does not exist." })
    } else {
      res.status(200).json({ tag })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The tag information could not be retrieved." })
  })
})

//Add New Tag
router.post('/', uppercase, (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).json({ errorMessage: "Please provide a tag." })
    return;
  }
  tagDb
  .insert({ tag })
  .then(tag => {
    res.status(200).json({ tag })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the tag to the database" })
  })
})
//Update Tag
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;
  if(!tag) {
    res.status(400).json({ error: "Please update the text for this tag"});
    return;
  }
  tagDb
  .update(id, { tag })
  .then(tag => {
    if (tag === 0) {
      res.status(404).json({ message: "The tag with the specified ID does not exist." })
      return;
    }
      res.status(200).json({ tag })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while updating the tag to the database" })
  })
})

//Delete a Tag
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tagDb
  .remove(id)
  .then(tag => {
    if(!tag) {
      res.status(404).json({ message: "The tag with the specified ID does not exist." })
    } else {
      res.status(200).json({ tag })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The tag could not be removed" })
  })
})

module.exports = router;
