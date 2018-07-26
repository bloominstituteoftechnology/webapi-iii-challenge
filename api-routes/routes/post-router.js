const express = require('express')

const db = require('../../data/helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching posts...')
    console.log(error.message)
  })
})

router.get('/:id', (req, res) => {
  db.get(req.params.id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching individual post...')
    console.log(error.message)
  })
})


router.get('/:id/tags', (req, res) => {
  db.getPostTags(req.params.id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching post tags...')
    console.log(error.message)
  })
})


router.post('/', (req, res) => {
  let { userId, text } = req.body;
  let post = {
    userId,
    text
  }
  db.insert(post)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(404).send('error adding post...')
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
    res.status(404).send("the post could not be removed")
  })
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let { userId, text } = req.body;
  let changes = {
    userId,
    text
  }
  db.update(id, changes)
  .then(response => {
    db.get(req.params.id).then(response2 => {
      res.status(200).json(response2)
    })
  })
  .catch(error => {
    console.log(error.message)
    res.status(500).send('Unable to update the post...')
  })
})

module.exports = router;
