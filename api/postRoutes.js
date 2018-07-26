const server = require('express')()
const postDb = require('../data/helpers/postDb')

server.get('/', (req, res) => {
  postDb
    .get()
    .then((posts) => res.status(200).json(posts))
    .catch((err) =>
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' })
    )
})

// GET POST BY ID
server.get('/:id', (req, res) => {
  postDb
    .get(req.params.id)
    .then((post) => {
      post === undefined
        ? res.status(404).json({
          message: `post with id of ${req.params.id} does not exist`
        })
        : res.status(200).json(post)
    })
    .catch((err) => res.status(500).json({ error: err }))
})

server.delete('/:id', (req, res) => {
  postDb
    .remove(req.params.id)
    .then((post) => {
      post == 0
        ? res.status(404).json({
          message: `The post with the specified ID of ${req.params
            .id} does not exist.`
        })
        : postDb.get().then((posts) => res.status(200).json(posts))
    })
    .catch((err) =>
      res.status(500).json({ error: 'The post could not be removed' })
    )
})
module.exports = server
