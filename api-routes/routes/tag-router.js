const express = require('express')

const db = require('../../data/helpers/tagDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching tags...')
    console.log(error.message)
  })
})

router.get('/:id', (req, res) => {
  db.get(req.params.id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching individual tag...')
    console.log(error.message)
  })
})


router.post('/', (req, res) => {
  console.log(req.body.tag)
  db.insert(req.body)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(404).send('error adding tag...')
      console.log(error.message)
    })
  })

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  db.remove(id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    console.log(error.message)
    res.status(404).send("the tag could not be removed")
  })
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  console.log(req.body.tag)
  db.update(id, req.body)
  .then(response => {
    db.get(req.params.id).then(response2 => {
      res.status(200).json(response2)
    })
  })
  .catch(error => {
    console.log(error.message)
    res.status(500).send('Unable to update the tag...')
  })
})

module.exports = router;
