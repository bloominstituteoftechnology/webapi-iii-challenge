const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')

module.exports = server => {
  server.use(express.json(), logger('tiny'), helmet(), cors()) 
  server.use((req, res, next) => {
    if (req.body.name) {
      req.body.name = req.body.name.toUpperCase()
    }
    next()
  })
}