const express = require('express');
const router = express.Router();
const tagDb = require('../data/helpers/tagDb');

router.get('/', (req, res) => {
  tagDb
    .get()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(err => {
      res.status(500).json({ error: 'The tags information could not be retreived' })
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  tagDb
    .get(id)
    .then(tag => {
      if (!tag) {
        res.status(404).json({ message: 'A tag with that ID could not be found' })
      }
      res.status(200).json(tag)})
    .catch(err => res.status(500).json({ error: 'The tag information could not be retrieved.' }))
});

router.post('/', (req, res) => {
  const tagData = req.body;
  tagDb
    .insert(tagData)
    .then(tagId => res.status(201).json({ message: 'tag added' }))
    .catch(err => res.status(500).json({ message: 'there was an error adding the tag' }))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  tagDb
    .remove(id)
    .then(count => {
      if (count === 0) {
        res.status(404).json({ message: 'A tag with the specified ID could not be found' })
      }
      res.status(200).json(count)})
    .catch(err => res.status(500).json({ message: 'there was an error deleting the tag'}))
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const tagUpdate = req.body;
  if (!tagUpdate) {
    res.status(404).json({ message: 'Updating a tag requires a name' })
  }
  tagDb
  .update(id, tagUpdate)
  .then(count => {
    if (count === 0) {
      res.status(404).json({ message: 'A tag with the provided ID cannot be found' })
    }
     res.status(201).json(count)})
  .catch(err => res.status(400).json({ message: 'could not update tag' }))
})

module.exports = router;
