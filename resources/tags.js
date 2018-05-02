const express = require('express');
const dbTags = require('../data/helpers/tagDb');
const router = express.Router();

// retrieve all tags
router.get('/', (req, res) => {
  dbTags.get()
    .then(tags => res.json(tags))
    .catch(err => res.status(500).json({ error: "The tags could not be retrieved." }))
})

// get tags by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbTags.get(id)
    .then(tags => res.json(tags)) // returns object with props id, tag
    .catch(err => res.status(500).json({ error: "Sorry." }))
})

// add a tag
router.post('/addtag', (req, res) => {
  const { id } = req.params;
  dbTags.insert(req.body)
    .then(tag => res.json(tag)) // returns object with prop id - representing the tag id
    .catch(err => res.status(500).json({ error: "Cannot add this tag." }))
})

module.exports = router;