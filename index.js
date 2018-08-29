// import packages
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

// import database
const postDb = require('./data/helpers/postDb')
const userDb = require('./data/helpers/userDb')

// create server 
const server = express();

// middlewares
server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(logger('short'))

const upperCaseName = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase()
  next()
}

// routing
//  --> /users
server.get('/users', async (req, res) => {
  const users = await userDb.get()
  res.status(200).json(users)
})

server.get('/users/:id', async (req, res) => {
  const userId = req.params.id
  const postsWrittenByUser = await userDb.getUserPosts(userId)
  res.status(200).json(postsWrittenByUser)
})

server.post('/users', upperCaseName, async (req, res) => {
  if (!req.body || !req.body.name) {
    res.status(500).json({ message: 'Error: missing JSON with name property' })
  } 

  const newUser = req.body
  const newId = await userDb.insert(newUser)
  const newUserWithId = { ...newUser, ...newId }
  res.status(200).json(newUserWithId)
})

server.put('/users/:id', async (req, res) => {
  if (!req.body || !req.body.name) {
    res.status(500).json({ message: 'Error: missing JSON with name property' })
  } 

  const updateId = req.params.id
  const updateUser = req.body
  const count = await userDb.update(updateId, updateUser)

  if (count === 1) {
    res.status(200).json({ message: `Success: updated user with id ${req.params.id}` })
  } else {
    res.status(500).json({ message: `Error: cannot update user with id ${req.params.id}` })
  }
})

server.delete('/users/:id', async (req, res) => {
  const deleteId = req.params.id
  const record = await userDb.remove(deleteId)
  if (record === 1) {
    res.status(200).json({ message: `Success: deleted user with id ${req.params.id}` })
  } else {
    res.status(500).json({ message: `Error: cannot delete user with id ${req.params.id}` })
  }
})

//  --> /posts
server.get('/posts', async (req, res) => {
  const posts = await postDb.get()
  res.status(200).json(posts)
})

server.post('/posts', async (req, res) => {
  if (!req.body || !req.body.text || !req.body.userId) {
    res.status(500).json({ message: 'Error: missing JSON with text and userId properties' })
  } 

  const newPost = req.body
  const newId = await postDb.insert(newPost)
  const newPostWithId = { ...newPost, ...newId }
  res.status(200).json(newPostWithId)
})

server.put('/posts/:id', async (req, res) => {
  if (!req.body || !req.body.text || !req.body.userId) {
    res.status(500).json({ message: 'Error: missing JSON with text and userId properties' })
  } 

  const updateId = req.params.id
  const updatePost = req.body
  const count = await postDb.update(updateId, updatePost)

  if (count === 1) {
    res.status(200).json({ message: `Success: updated post with id ${req.params.id}` })
  } else {
    res.status(500).json({ message: `Error: cannot update post with id ${req.params.id}` })
  }
})

server.delete('/posts/:id', async (req, res) => {
  const deleteId = req.params.id
  const record = await postDb.remove(deleteId)
  if (record === 1) {
    res.status(200).json({ message: `Success: updated post with id ${req.params.id}` })
  } else {
    res.status(500).json({ message: `Error: cannot update post with id ${req.params.id}` })
  }
})

// run server
server.listen(8000, () => console.log('CORS-enabled web server listening on port 8k'))