const express = require('express');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');
const server= express();

server.use(express.json());

server.listen(9001, ()=> {
    console.log('Server is over 9000')
});

server.get('/', (req, res) => {
    res.send('Node-Blog');
});

///////////////// USERS 

server.get('/users', (req, res) => {
    users.get()
    .then(users => {
        res.json(users)
    })
    .catch(() => {
        res.status(500).json({error:'Cannot get users'})
    })
})

server.get('/users/:id', (req, res)=> {
    const {id} = req.params;
    users.get(id)
    .then( user =>{
        if (user===0) {
            res.status(404).json({message:'User id does not exist'})
        } else {
            res.json(user)
        }
    })
    .catch(()=> {
        res.status(500).json({error:'User info could not be retrieved'})
    })
});

///////////////// POSTS

server.get('/posts', (req, res) => {
    posts.get()
    .then(posts => {
        res.json(posts)
    })
    .catch(() => {
        res.status(500).json({error:'Cannot retrieve posts'})
    })
})

server.get('/posts/:id', (req, res) => {
    const {id}= req.params;
    posts.get(id)
    .then(post=>{
        if(post===0){
            res.status(404).json({message:'Post id does not exist'})
        } else {
            res.json(post)
        }
    })
    .catch(() =>{
        res.status(500).json({error:'Post info could not be retrieved'})
    })
});

//////////////// TAGS

server.get('/tags', (req, res) => {
    tags.get()
    .then(tags=> {
        res.json(tags)
    })
    .catch(()=> {
        res.status(500).json({error:'Cannot get tags'})
    })
})