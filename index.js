const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const postDb = require('./data/helpers/postDb')
const tagDb = require('./data/helpers/tagDb')
const userDb = require('./data/helpers/userDb')

const server = express()

// adding middleware
server.use(helmet())
server.use(logger('short'))
server.use(express.json())

// endpoints for GET method
server.get('/api/users', (req, res) => {
  userDb
    .get()
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' })
    )
})

server.get('/api/posts', (req, res) => {
  postDb
    .get()
    .then((posts) => res.status(200).json(posts))
    .catch((err) =>
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' })
    )
})

server.use(function (req, res) {
  res.status(404).send("Ain't nobody got time for that!")
})

server.listen(8000, () => console.log('\n=== API running... ===\n'))
