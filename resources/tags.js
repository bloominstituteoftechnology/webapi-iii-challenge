const express = require('express');
const dbTags = require('../data/helpers/tagDb');
const router = express.Router();

// retrieve all tags
router.get('/', (req, res) => {
  dbTags.get()
    .then(tags => res.json(tags.map(tag => {return {...tag, tag: tag.tag.toUpperCase()}}))) 
    .catch(err => res.status(500).json({ error: "The tags could not be retrieved." }))
})

// get tags by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbTags.get(id)
    .then(tags => res.json({...tags, tag: tags.tag.toUpperCase()})) // returns object with props id, tag
    .catch(err => res.status(500).json({ error: "Sorry." }))
})

// add a tag
router.post('/addtag', (req, res) => {
  dbTags.insert(req.body)
    .then(tag => res.json(tag)) // returns object with prop id - representing the tag id
    .catch(err => res.status(500).json({ error: "Cannot add this tag." }))
})

// update a tag
router.put('/:id/update', (req, res) => {
  const { id } = req.params;
  dbTags.update(id, req.body) // req.body should be { tag: "tag content" }
    .then(tag => res.json(tag)) // returns 1 for success, 0 for failure
    .catch(err => res.status(500).json({ error: "Cannot update this tag." }))
})

// delete a tag
router.delete('/:id/delete', (req, res) => {
  const { id } = req.params;
  dbTags.remove(id)
    .then(tag => res.json(tag)) // returns 1 for success, 0 for failure
    .catch(err => res.status(500).json({ error: "Cannot delete this tag." }))
})

module.exports = router;