const server = require('express')()
const tagDb = require('../data/helpers/tagDb')
// GET ALL TAGS
server.get('/', (req, res) => {
  tagDb.get().then((tags) => res.status(200).json(tags))
})

// GET TAG BY ID
server.get('/:id', (req, res) => {
  tagDb
    .get(req.params.id)
    .then((tag) => {
      tag === undefined
        ? res.status(404).json({
          message: `tag with id of ${req.params.id} does not exist`
        })
        : res.status(200).json(tag)
    })
    .catch((err) =>
      res.status(500).json({ error: 'Tag information could not be retrieved.' })
    )
})

// POST A NEW TAG
server.post('/', (req, res) => {
  const tag = req.body.tag
  !tag || tag.length > 80
    ? res.status(400).json({
      errorMessage: 'Please provide text for this tag.'
    })
    : tagDb
      .insert(req.body)
      .then((tag) =>
        tagDb.get(tag.id).then((newTag) => res.status(201).json(newTag))
      )
      .catch((err) =>
        res.status(400).json({
          error: 'There was an error while saving the tag to our database'
        })
      )
})

// UPDATE A TAG
server.put('/:id', (req, res) => {
  const tag = req.body.tag
  const id = req.params.id
  !tag || tag.length > 80
    ? res
      .status(400)
      .json({ errorMessage: 'Please provide a name for this new user' })
    : tagDb
      .update(id, req.body)
      .then((update) =>
        tagDb.get(req.params.id).then((tag) => res.status(200).json(tag))
      )
})

server.delete('/:id', (req, res) => {
  tagDb
    .remove(req.params.id)
    .then((tag) => {
      tag == 0
        ? res.status(404).json({
          message: `The post with the specified ID of ${req.params
            .id} does not exist.`
        })
        : tagDb.get().then((tags) => res.status(200).json(tags))
    })
    .catch((err) =>
      res.status(500).json({ error: 'The post could not be removed' })
    )
})

module.exports = server
