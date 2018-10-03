const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const userDb = require('./data/helpers/userDb')
const postDb = require('./data/helpers/postDb')
const tagDb = require('./data/helpers/tagDb')

const port = 7000
const server = express();

server.use(express.json())
server.use(cors(), helmet(), morgan('combined'))

server.get('/users', (req,res) => {
    userDb.get().then(users => {
        res.json(users)
    })
})

server.get('/posts', (req,res) => {
    postDb.get().then(posts => {
        res.json(posts); 
    })
})

server.get(`/users/posts`, (res,req) =>{
    
})

server.listen(port, err =>{
    if(err) console.log(err);
    console.log(`Server is running at port: ${port}`)
})
