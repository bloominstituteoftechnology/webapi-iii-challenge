const server = require('express')()
const userDb = require('../data/helpers/userDb')
const postDb = require('../data/helpers/postDb')
// GET ALL USERS
server.get('/', (req, res) => {
  userDb
    .get()
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' })
    )
})

// GET USER BY ID
server.get('/:id', (req, res) => {
  userDb
    .get(req.params.id)
    .then((user) => {
      user === undefined
        ? res.status(404).json({
          message: `user with id of ${req.params.id} does not exist`
        })
        : res.status(200).json(user)
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: 'User information could not be retrieved.' })
    )
})

// GET ALL POST POSTED BY A SPECIFIC USER
server.get('/:id/posts', (req, res) => {
  userDb.get(req.params.id).then((user) => {
    user === undefined
      ? res.status(404).json({
        message: `user with id of ${req.params.id} does not exist`
      })
      : userDb
        .getUserPosts(req.params.id)
        .then((posts) => {
          res.status(200).json(posts)
        })
        .catch((err) =>
          res.status(404).json({
            message: `user with ID of ${req.params.id} does not have any post`
          })
        )
  })
})

// ADD A NEW USER
server.post('/', (req, res) => {
  !req.body.name || req.body.name.length > 120
    ? res.status(400).json({
      errorMessage: 'Please provide a name for this new user'
    })
    : userDb
      .insert(req.body)
      .then((newUser) => {
        userDb
          .get(newUser.id)
          .then((newUser) => res.status(201).json(newUser))
          .catch((err) => res.status(400).json({ error: err }))
      })
      .catch((err) =>
        res.status(400).json({
          error: err
        })
      )
})

// LET USER ADD A NEW POST
server.post('/:id/newpost', (req, res) => {
  const text = req.body.text
  const newPost = { text, userId: req.params.id }
  !text
    ? res.status(400).json({
      errorMessage: 'Please provide text for the post.'
    })
    : postDb
      .insert(newPost)
      .then((newPost) =>
        postDb
          .get(newPost.id)
          .then((newPost) => res.status(201).json(newPost))
      )
      .catch((err) =>
        res.status(400).json({
          error: 'There was an error while saving the post to the database'
        })
      )
})

// UPDATE A USERS NAME
server.put('/:id', (req, res) => {
  const name = req.body.name
  const id = req.params.id
  !name || name.length > 120
    ? res.status(400).json({
      errorMessage: 'Please provide text for the post.'
    })
    : userDb
      .update(id, req.body)
      .then((update) =>
        userDb.get(id).then((user) => res.status(200).json(user))
      )
})

// DELETE A SPECIFIC USER
server.delete('/:id', (req, res) => {
  const userId = req.params.id
  userDb
    .remove(userId)
    .then((user) => {
      user == 0
        ? res.status(404).json({
          message: `The user with the specified ID of ${req.params
            .id} does not exist.`
        })
        : userDb
          .getUserPosts(userId)
          .then((postList) => {
            postList.forEach((post) => {
              postDb
                .remove(post.id)
                .then((post) => next())
                .catch((err) => res.status(400).json({ error: err }))
            })
          })
          .catch((err) => res.status(400).json({ error: err }))
    })
    .catch((err) => res.status(500).json({ error: err }))
})

module.exports = server
