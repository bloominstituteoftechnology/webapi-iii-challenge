const express = require('express');
const helmet = require("helmet")
const morgan = require('morgan')

//import Db models
const postDb = require('./data/helpers/postDb')
const tagDb = require('./data/helpers/tagDb')
const userDb = require('./data/helpers/userDb')

//instance of express server
const server = express()

// add json middleware
server.use(express.json())

// add helmet  and morgan middleware
server.use(helmet())
server.use(morgan('dev'))


server.get('/', (req, res) =>{
    res.send('Welcome to API for POST, TAGS AND USERS')
})

//POSTS API CRUD



server.listen(5000, () =>{
    console.log('API is Running !!!!')
})