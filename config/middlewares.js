const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

module.exports = server => {
  server.use(express.json())
  server.use(cors())
  server.use(helmet())
  server.use(logger('short'))
}