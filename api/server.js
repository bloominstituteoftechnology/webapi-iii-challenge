const express = require('express')
const server = express();
const helmet = require('helmet')
const morgan = require('morgan')
const userDb = require('../data/helpers/userDb.js')
const postDb= require('../data/helpers/postDb.js')
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))

server.get('/posts', (req, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => console.log(error))
})


module.exports = server
