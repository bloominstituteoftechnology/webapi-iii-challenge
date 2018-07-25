const express = require('express')
const morgan  = require('morgan')
const userDb  = require('./data/helpers/userDb')
const postDb  = require('./data/helpers/postDb')
const tagDb   = require('./data/helpers/tagDB')

const server  = express()

server.use(express.json())
server.use(morgan('tiny'))

server.post('/users', async (req, res) => {
  if (!req.body || !req.body.name)
    res.status(400).json({ message: "you need to provide a name for the user" })

  const { name } = req.body
  
  try {
    const { id } = await userDb.insert({ name }) 
    if (id) {
      res.status(200).json({ id, name })
    }
  } catch(e) {
    res.status(500).json({ error: "couldn't add user to db" })
  }
})

server.get('/users', async (req, res) => {
  try {
    const users = await userDb.get()
    res.status(200).json(users)
  } catch(e) {
    res.status(500).json({ error: "couldn't retrieve users" })
  }
})

server.listen(8080, () => console.log('💵:8080'))
