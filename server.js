const express = require('express')
const cors = require('cors')
const app = express()

const userDb = require('./data/helpers/userDb')
const postDb = require('./data/helpers/postDb')
const tagDb = require('./data/helpers/tagDb')

app.use(express.json())
app.use(cors())

// USERS
app.get('/api/users', (req, res) => {
  userDb
    .get()
    .then((response) => res.status(200).send(response))
    .catch(() => res.status(500).send({ error: 'Error fetching users' }))
})

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  userDb 
    .get(id)
    .then((response) => response.length === 0
      ? res.status(404).send({ error: `User with id ${id} not found` })
      : res.status(200).send(response))
    .catch(() => res.status(500).send({ error: `Error fetching user with id ${id}` }))
})

app.get('/api/users/:id/posts', (req, res) => {
  const id = req.params.id
  userDb.getUserPosts(id)
    .then(response => response.length === 0
      ? res.status(404).send({ error: `No posts found for user with id ${id}` })
      : res.status(200).send(response))
    .catch(() => res.status(500).send({ error: `Error fetching posts for user with id ${id}` }))
})

app.post('/api/users', (req, res) => {
  body = req.body
  if (body && body.name) {
    userDb
      .insert(body)
      .then(response => res.status(201).send(response))
      .catch(() => res.status(500).send({ error: 'Error creating user' }))
  } else {
    res.status(400).send({ error: 'Please provide a name for the user' })
  }  
})

app.delete('/api/users/:id', (req, res) => {
  id = req.params.id
  userDb
    .remove(id)
    .then((response) => response === 0
      ? res.status(404).send({ error: `User with id ${id} not found` })
      : res.status(200).send({ message: `User with id ${id} deleted` }))
    .catch(() => res.status(500).send({ error: `Error deleting user with id ${id}` }))
})

app.put('/api/users/:id', (req, res) => {
  id = req.params.id
  body = req.body
  if (body && body.name) {
    userDb
      .update(id, body)
      .then(response => response === 0
        ? res.status(404).send({ error: `User with id ${id} not found` })
        : res.status(200).send({ message: `User with id ${id} updated` }))
      .catch(() => res.status(500).send({ error: `Error updating user with id ${id}` }))
  }
})

// POSTS
app.get('/api/posts', (req, res) => {
  postDb
    .get()
    .then((response) => res.status(200).send(response))
    .catch(() => res.status(500).send({ error: 'Error fetching posts' }))
})

app.get('/api/posts/:id', (req, res) => {
  const id = req.params.id
  postDb
    .get(id)
    .then((response) => response.length === 0
      ? res.status(404).send({ error: `Post with id ${id} not found` })
      : res.status(200).send(response))
    .catch(() => res.status(500).send({ error: `Error fetching post with id ${id}` }))
})

app.get('/api/posts/:id/tags', (req, res) => {
  const id = req.params.id
  postDb
    .getPostTags(id)
    .then((response) => response.length === 0
      ? res.status(404).send({ error: `No tags found for post with id ${id}` })
      : res.status(200).send(response))
    .catch(() => res.status(500).send({ error: `Error fetching tags for post with id ${id}` }))
})

app.post('/api/posts', (req, res) => {
  body = req.body
  if (body && body.userId && body.text) {
    userDb
      .get(body.userId)
      .then(response => response.length === 0
        ? res.status(404).send(({ error: `No user found with id ${body.userId}` }))
        : postDb
          .insert(body)
          .then((response) => res.status(201).send(response))
          .catch(() => res.status(500).send({ error: 'Error creating post' })))
      .catch(() => res.status(500).send({ error: `Error finding user with id ${body.userId}` }))
  } else {
    res.status(400).send({ error: 'Please provide a valid userId and text for the post' })
  }
})

app.delete('/api/posts/:id', (req, res) => {
  id = req.params.id
  postDb  
    .remove(id)
    .then((response) => response === 0
      ? res.status(404).send({ error: `Post with id ${id} not found` })
      : res.status(200).send({ message: `Post with id ${id} deleted` }))
    .catch(() => res.status(500).send({ error: `Error deleting post with id ${id}` }))
})

app.put('/api/posts/:id', (req, res) => {
  id = req.params.id
  body = req.body
  if (body && body.text || body.userId) {
    postDb
      .update(id, body)
      .then((response) => response === 0
        ? res.status(404).send({ error: `Post with id ${id} not found` })
        : res.status(200).send({ message: `Post with id ${id} updated` }))
      .catch(() => res.status(500).send({ error: `Error updating post with id ${id}` }))
  }
})

// TAGS
app.get('/api/tags', (req, res) => {
  tagDb
    .get()
    .then(response => res.status(200).send(response))
    .catch(() => res.status(500).send({ error: 'Error fetching tags' }))
})

app.get('/api/tags/:id', (req, res) => {
  const id = req.params.id
  tagDb
    .get(id)
    .then(response => response.length === 0
      ? res.status(404).send({ error: `Tag with id ${id} not found` })
      : res.status(200).send(response))
    .catch(() => res.status(500).send({ error: `Error fetching tag with id ${id}` }))
})

app.post('/api/tags', (req, res) => {
  const body = req.body
  if (body && body.tag) {
    tagDb
      .insert(body)
      .then(response => res.status(201).send(response))
      .catch(() => res.status(500).send({ error: 'Error creating tag, possible duplicate' }))
  } else {
    res.status(400).send({ error: 'Please include tag property with text' })
  }
})

app.delete('/api/tags/:id', (req, res) => {
  const id = req.params.id
  tagDb
    .remove(id)
    .then(response => response === 0
      ? res.status(404).send({ error: `Tag with id ${id} not found` })
      : res.status(200).send({ message: `Tag with id ${id} deleted` }))
    .catch(() => res.status(500).send({ error: `Error deleting tag with id ${id}` }))
})

app.put('/api/tags/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  if (body && body.tag) {
    tagDb
      .update(id, body)
      .then(response => response === 0
        ? res.status(404).send({ error: `Tag with id ${id} not found` })
        : res.status(200).send({ message: `Tag with id ${id} updated` }))
      .catch(() => res.status(500).send({ error: `Error updating tag with id ${id}` }))
  }
})

app.listen(5000, console.log('Listening'))