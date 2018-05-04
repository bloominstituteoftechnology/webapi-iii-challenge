const express = require('express');
const tagDb = require('../data/helpers/tagDb.js');

const router = express.Router();

router.use(express.json());


router.get('/', (req, res) => {
  tagDb.get()
  .then(tags => {
    res.json(tags);
  })
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  tagDb.get(id)
  .then(user => {
    res.json(user);
  })
})

router.post('/', (req, res) => {
  const tag = req.body
  tagDb.insert(tag)
  .then(response => {
    tagDb.get(response.id)
    .then(newTag => {
      res.json(newTag);
    })
  })

})

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const update = req.body;
  tagDb.update(id, update)
  .then(response => {
    tagDb.get(id)
    .then(updatedTag => {
      res.json(updatedTag);
    })
  })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  tagDb.get(id)
  .then(user => {
    tagDb.remove(user.id)
    .then(() => {
      res.json(user);
    })
  })
})

module.exports = router;
