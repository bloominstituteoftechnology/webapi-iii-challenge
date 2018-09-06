const express = require('express');
const postDb = require('./data/helpers/postDb')
const tagDb = require('./data/helpers/tagDb')
const userDb = require('./data/helpers/userDb')
const server = express();

//middleware
function upperCase(req, res, next){

    next();}

server.use(upperCase);
//routes

server.get('/api/users', (req, res) => {
   userDb.get()
   .then(users => {
       res.status(200).json(users);
   })
   .catch(err => {
       res.status(500).json({error: 'Could not get users'})
   })
})

server.post('/api/users', (req, res) => {
    console.log(req.ids)
    const name = req.body
    
    userDb.insert(name)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err =>{
        res.status(500).json({error: 'Could not add user'}),
        console.log(name)
    })
})

//start server
server.listen(3000, () => console.log('\n== API on port 3k ==\n'))