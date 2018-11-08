const express = require('express')
const postDb = require('../../data/helpers/postDb.js')

const router = express.Router()

router.get('/', (req, res) => {
  postDb
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(404).json({ error: 'no posts found' }))
})

router.get('/:id', (req, res) => {
  console.log(`getting ${req.params.id}`)
  postDb
    .get(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(404).json({ error: 'post not found' }))
})

router.post('/', (req, res) => {
  postDb
    .insert(req.body)
    .then(success => res.status(201).json(success))
    .catch(err => res.status(400).json({ error: 'failed to add post' }))
})

router.put('/:id', (req, res) => {
  postDb
    .update(req.params.id, req.body)
    .then(count => res.status(201).json(count))
    .catch(err => res.status(400).json({ error: 'failed to modify post' }))
})

router.delete('/:id', (req, res) => {
  postDb
    .remove(req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(400).json({ error: 'failed to delete post' }))
})

module.exports = router
