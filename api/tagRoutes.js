const server = require('express')()
const tagDb = require('../data/helpers/tagDb')

// GET ALL TAGS
server.get('/', (req, res) => {
  tagDb.get().then((tags) => res.status(200).json(tags))
})

// GET TAG BY ID
server.get('/:id', (req, res, next) => {
  tagDb
    .get(req.params.id)
    .then((tag) => {
      tag === undefined
        ? next(new Error('INVALID_ITEM'))
        : res.status(200).json(tag)
    })
    .catch(next)
})

// POST A NEW TAG
server.post('/', (req, res, next) => {
  const tag = req.body.tag
  if (!tag || tag.length > 80) {
    next(new Error('INVALID_TAG'))
  }
  tagDb
    .insert(req.body)
    .then((tag) =>
      tagDb.get(tag.id).then((newTag) => res.status(201).json(newTag))
    )
    .catch(next)
})

// UPDATE A TAG
server.put('/:id', (req, res, next) => {
  const tag = req.body.tag
  const id = req.params.id
  if (!tag || tag.length > 80) {
    next(new Error('INVALID_TAG'))
  }
  tagDb
    .update(id, req.body)
    .then((update) =>
      tagDb.get(req.params.id).then((tag) => res.status(200).json(tag))
    )
    .catch(next)
})

// DELETE A TAG
server.delete('/:id', (req, res, next) => {
  tagDb
    .remove(req.params.id)
    .then((tag) => {
      if (tag == 0) {
        next(new Error('INVALID_ITEM'))
      }
      tagDb.get().then((tags) => res.status(200).json(tags))
    })
    .catch(next)
})

module.exports = server
