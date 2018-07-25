const express = require('express')
const morgan  = require('morgan')
const userDb  = require('./data/helpers/userDb')
const postDb  = require('./data/helpers/postDb')
const tagDb   = require('./data/helpers/tagDB')

const server  = express()

server.use(express.json())
server.use(morgan('tiny'))

server.get('/users', async (req, res) => {
  try {
    const users = await userDb.get()
    res.status(200).json(users)
  } catch(e){
    res.status(500).json({ error: "couldn't retrieve users" })
  }
})

server.listen(8080, () => console.log('💵:8080'))
