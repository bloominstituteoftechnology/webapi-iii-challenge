const express = require('express');
const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');
const logger = require('morgan') ;

const PORT = 5050;

server=express();
server.use(
    express.json(),
    logger('dev')
)

//users
server.get('/users', (req, res)=>{
    userDB.get()
        .then((users)=>{
            res.json(users)
        })
        .catch(err=>{
            res.status(500)
            .json({message: "problem grabbing the Users"})
        })
});

server.get('/user/:id', (req, res))

//posts
server.get('/posts', (req, res)=>{
    postDB.get()
    .then(posts=>{
        res.json(posts);
    })
    .catch(err=>{
        res
        .status(500)
        .json({ message: "problem grabbing the Posts"})
    })
})

server.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`)
})