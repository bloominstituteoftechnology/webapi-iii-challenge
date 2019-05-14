const express = require('express')
const port = 8008
const server = express()

server.use(express.json())

//custom middleware
const warez = require('./middleware')
server.use(warez.logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

server.listen(port, () => {
  console.log(`Hearing voices on port ${port}...`)
})

module.exports = server