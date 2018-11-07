// import modules
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

// import db helpers
const postDb = require('../data/helpers/postDb.js')
const userDb = require('../data/helpers/userDb.js')

// initialize server
const server = express()

// configure middleware
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))

// configure custom middleware
const uppercaseName = (req, res, next) => {
  const { name } = req.body
  req.body.name = name.substring(0, 1).toUpperCase() + name.substring(1)
  next()
}

// verification server is live
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' })
})

// set up routes for users
server.get('/users/', (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json({ error: 'no users found' }))
})

server.get('/users/:id', (req, res) => {
  userDb
    .get(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json({ error: 'user not found' }))
})

server.post('/users/', uppercaseName, (req, res) => {
  userDb
    .insert(req.body)
    .then(success => res.status(201).json(success))
    .catch(err => res.status(400).json({ error: 'failed to add user' }))
})

server.put('/users/:id', uppercaseName, (req, res) => {
  userDb
    .update(req.params.id, req.body)
    .then(count => res.status(201).json(count))
    .catch(err => res.status(400).json({ error: 'failed to modify user' }))
})

server.delete('/users/:id', (req, res) => {
  userDb
    .remove(req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(400).json({ error: 'failed to delete user' }))
})

// set up routes for posts
server.get('/posts/', (req, res) => {
  postDb
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(404).json({ error: 'no posts found' }))
})

server.get('/posts/:id', (req, res) => {
  console.log(`getting ${req.params.id}`)
  postDb
    .get(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(404).json({ error: 'post not found' }))
})

server.get('/posts/user/:id', (req, res) => {
  userDb
    .getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(404).json({ error: 'no posts for that user' }))
})

server.post('/posts/', uppercaseName, (req, res) => {
  postDb
    .insert(req.body)
    .then(success => res.status(201).json(success))
    .catch(err => res.status(400).json({ error: 'failed to add post' }))
})

server.put('/posts/:id', uppercaseName, (req, res) => {
  postDb
    .update(req.params.id, req.body)
    .then(count => res.status(201).json(count))
    .catch(err => res.status(400).json({ error: 'failed to modify post' }))
})

server.delete('/posts/:id', (req, res) => {
  postDb
    .remove(req.params.id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(400).json({ error: 'failed to delete post' }))
})

// export server
module.exports = server
