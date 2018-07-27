const server = require('express')()
const postDb = require('../data/helpers/postDb')

// GET ALL POSTS
server.get('/', (req, res, next) => {
  postDb.get().then((posts) => res.status(200).json(posts)).catch(next)
})

// GET POST BY ID
server.get('/:id', (req, res, next) => {
  postDb
    .get(req.params.id)
    .then((post) => {
      if (post === undefined) {
        next(new Error('INVALID_ITEM'))
      }
      res.status(200).json(post)
    })
    .catch(next)
})

// UPDATE A POST
server.put('/:id', (req, res, next) => {
  const text = req.body
  const id = req.params.id
  if (!text) {
    next(new Error('INVALID_POST'))
  }
  postDb
    .update(id, text)
    .then((update) => postDb.get(id).then((post) => res.status(200).json(post)))
    .catch(next)
})

// DELETE A POST
server.delete('/:id', (req, res, next) => {
  postDb
    .remove(req.params.id)
    .then((post) => {
      if (post == 0) {
        next(new Error('INVALID_ITEM'))
      }
      postDb.get().then((posts) => res.status(200).json(posts)).catch(next)
    })
    .catch(next)
})
module.exports = server
