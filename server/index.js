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
server.use(morgan('short'))

// configure custom middleware
function gatekeeper(req, res, next) {
  // next points to the next middleware/route handler in the queue
  if (req.query.pass === 'mellon') {
    console.log('welcome travelers')

    req.welcomeMessage = 'welcome to the mines of Moria'

    next() // continue to the next middleware
  } else {
    res.send('you shall not pass!')
  }
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

server.post('/users/', (req, res) => {
  userDb
    .insert(req.body)
    .then(success => res.status(201).json(success))
    .catch(err => res.status(400).json({ error: 'failed to add user' }))
})

server.put('/users/:id', (req, res) => {
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

// export server
module.exports = server
