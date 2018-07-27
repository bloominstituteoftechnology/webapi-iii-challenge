const server = require('express')()
const userDb = require('../data/helpers/userDb')
const postDb = require('../data/helpers/postDb')

// GET ALL USERS
server.get('/', (req, res, next) => {
  userDb.get().then((users) => res.status(200).json(users)).catch(next)
})

// GET USER BY ID
server.get('/:id', (req, res, next) => {
  userDb
    .get(req.params.id)
    .then((user) => {
      user === undefined
        ? next(new Error(`CANT_FIND_USER`))
        : res.status(200).json(user)
    })
    .catch(next)
})

// GET ALL POST POSTED BY A SPECIFIC USER
server.get('/:id/posts', (req, res, next) => {
  userDb.get(req.params.id).then((user) => {
    if (user === undefined) {
      next(new Error(`CANT_FIND_USER`))
    }
    userDb
      .getUserPosts(req.params.id)
      .then((posts) => {
        posts.length > 0 ? res.status(200).json(posts) : res.sendStatus(204)
      })
      .catch(next)
  })
})

// ADD A NEW USER
server.post('/', (req, res, next) => {
  !req.body.name || req.body.name.length > 120
    ? next(new Error('INVALID_USER'))
    : userDb
      .insert(req.body)
      .then((newUser) => {
        userDb
          .get(newUser.id)
          .then((newUser) => res.status(201).json(newUser))
      })
      .catch(next)
})

// LET USER ADD A NEW POST
server.post('/:id/newpost', (req, res, next) => {
  const text = req.body.text
  const newPost = { text, userId: req.params.id }
  if (!text) {
    next(new Error('INVALID_POST'))
  }
  postDb
    .insert(newPost)
    .then((newPost) =>
      postDb.get(newPost.id).then((newPost) => res.status(201).json(newPost))
    )
    .catch(next)
})

// UPDATE A USERS NAME
server.put('/:id', (req, res, next) => {
  const name = req.body.name
  const id = req.params.id
  if (!name || name.length > 120) {
    next(new Error('INVALID_USER'))
  }
  userDb
    .update(id, req.body)
    .then((update) => userDb.get(id).then((user) => res.status(200).json(user)))
})

// DELETE A SPECIFIC USER
server.delete(
  '/:id',
  (req, res, next) => {
    const userId = req.params.id
    userDb
      .getUserPosts(userId)
      .then((postList) => {
        postList.forEach((post) => {
          postDb.remove(post.id).then((update) => update, next('route'))
        })
      })
      .catch(next)
  },
  (req, res, next) => {
    userDb.remove(req.params.id).then((user) => {
      user == 0 ? next(new Error(`CANT_FIND_USER`)) : res.status(200).json(user)
    })
  }
)

module.exports = server
