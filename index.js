const express = require('express');

const postDb = require('./data/helpers/postDb.js');
const userDb =  require ('./data/helpers/userDb.js')



const server = express();
server.use(express.json())
const PORT = 4000;

server.get('/post', (req, res) =>{
    postDb.get()
    .then(posts =>{
        res.status(200).json(posts)
    }).catch(err => {
        res.status(500).json({message:"trouble getting posts"})
    })
})

server.get('/post/:id', (req, res) =>{
    const  { id } = req.params;
    postDb.get(id)
    .then(posts =>{
        res.status(200).json(posts)
    }).catch(err => {
        res.status(500).json({message:"trouble getting posts"})
    })
})


server.get('/user', (req, res) =>{
    userDb.get()
    .then(user =>{
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json({message:"trouble getting users"})
    })
})

server.get('/user/:id', (req, res) =>{
    const  { id } = req.params;
    postDb.get(id)
    .then(user =>{
        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json({message:"trouble getting user"})
    })
})

server.post('/post', (req, res) =>{
    const data = req.body;
    postDb.insert(data)
    .then(post =>{
        res.status(201).json(post)
    }).catch(err =>{
        res.status(404).json({message:"Could not update Post"})
    })
})

server.post('/user', (req, res) =>{
    const data = req.body;
    userDb.insert(data)
    .then(user =>{
        res.status(201).json(user)
    }).catch( err =>{
        res.status(404).json({message:"Could not update User"})
    })
})

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}!`)
})