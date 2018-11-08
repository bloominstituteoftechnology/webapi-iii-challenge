const express = require('express')
const userDb = require('../../data/helpers/userDb.js')
const uppercaseName = require('../utils/uppercaseNameMiddleware.js')

const router = express.Router()

router.get('/', (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ error: 'no users found' }))
})

router.get('/:id', (req, res) => {
  userDb
    .get(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: 'user not found' }))
})

router.post('/', uppercaseName, (req, res) => {
  userDb
    .insert(req.body)
    .then(success => res.status(201).json(success))
    .catch(err => res.status(400).json({ error: 'failed to add user' }))
})

router.put('/:id', uppercaseName, (req, res) => {
  userDb
    .update(req.params.id, req.body)
    .then(count => res.status(201).json(count))
    .catch(err => res.status(400).json({ error: 'failed to modify user' }))
})

router.delete('/:id', (req, res) => {
  userDb
    .remove(req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(400).json({ error: 'failed to delete user' }))
})

router.get('/user/:id/posts', (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(404).json({ error: 'no posts for that user' }))
})

module.exports = router
