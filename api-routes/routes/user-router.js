const express = require('express')

const db = require('../../data/helpers/userDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching users...')
    console.log(error.message)
  })
})

router.get('/:id', (req, res) => {
  db.get(req.params.id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching individual user...')
    console.log(error.message)
  })
})

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(404).send('error fetching user posts...')
    console.log(error.message)
  })
})

router.post('/', (req, res) => {
  let { name } = req.body;
  let user = {
    name
  }
  db.insert(user)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(404).send('error adding user account...')
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
    res.status(404).send("the user could not be removed")
  })
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let { name } = req.body;
  let changes = {
    name
  }
  db.update(id, changes)
  .then(response => {
    db.get(req.params.id).then(response2 => {
      res.status(200).json(response2)
    })
  })
  .catch(error => {
    console.log(error.message)
    res.status(500).send('Unable to update user information...')
  })
})

module.exports = router;
