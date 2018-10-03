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

//------------------------------------------------------GET ROUTE HANDLERS
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

server.get('/tags', (req,res) => {
    tagDb.get().then(tags => {
        res.json(tags)
    })
})

server.get(`/users/posts/:userId`, (req,res) =>{
    console.log(req.params);
    const {userId} = req.params
    userDb.getUserPosts(userId).then(userPosts => {
        res.json(userPosts)
    })
})
//--------------------------------------------------------------POST ROUTE HANDLERS 
server.post("/users/posts", (req,res) => {
   const {text, userId} = req.body
   postDb.insert({text, userId})
   .then(() =>{
        userDb.getUserPosts(userId)
        .then(newUserPosts => {
            res.json(newUserPosts)
        })
   })
})

//-------------------------------------------------------------DELETE ROUTE HANDLERS
server.delete("/users/posts/:id/:userId", (req,res) => {
    const {id,userId} = req.params
    postDb.remove(id)
    .then(() => {
        userDb.getUserPosts(userId)
        .then(newUserPosts => {
            res.json(newUserPosts)
        })
    })

})    

//------------------------------------------------------------UPDATE ROUTE HANDLERS 
server.put("/users/posts/:id/:userId", (req,res) => {
    const {id,userId} = req.params
    const {text} = req.body
    postDb.update(id, {text, userId})
    .then(() => {
        userDb.getUserPosts(userId)
        .then(newUserPosts => {
            res.json(newUserPosts)
        })
    })

})    
//--------------------------------------------------------------------------------------

server.listen(port, err =>{
    if(err) console.log(err);
    console.log(`Server is running at port: ${port}`)
})
