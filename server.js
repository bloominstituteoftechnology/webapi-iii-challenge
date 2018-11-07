//Imports
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const userDb = require('./data/helpers/userDb.js')
const postDb = require('./data/helpers/postDb.js')

const server = express()

//Middleware
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

// End points

server.get('/', (req, res) => {
    postDb.get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})
    })
})

server.get('/:id', (req, res) => {
    const {id} = req.params
    postDb.get(id)
    .then(post => {
        console.log(post)
    })
})


module.exports = server;

