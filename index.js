const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const postDb = require('./data/helpers/postDb')
const tagDb = require('./data/helpers/tagDb')
const userDb = require('./data/helpers/userDb')

const server = express()

server.use(helmet())
server.use(morgan('short'))

server.use(express.json())

server.listen(8000, () => console.log('\n=== API running... ===\n'))
