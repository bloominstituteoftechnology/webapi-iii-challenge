const express = require('express');
const helmet = require("helmet")
const morgan = require('morgan')

const server = express()

server.get('/', (req, res) =>{
    res.send('API IS WORKING')
})

//POSTS API CRUD



server.listen(5000, () =>{
    console.log('API is Running !!!!')
})