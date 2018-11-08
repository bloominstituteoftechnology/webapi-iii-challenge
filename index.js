//importing node modules
const express = require('express');

const userdb = require('./data/helpers/userDb');

//create server
const server=express();

server.use(express.json());

//CRUD methods for userdb
//GET
server.get('/api/users', (req, res) =>{
    userdb.get()
    .then(users=>{
        res.status(200)
        .json(users)
    })
    .catch(error =>{
        res.status(500)
        .json({error: "The users could not be retrieved."})
    })
})

//GET by id
server.get('/api/users/:id', (req, res) => {
    
    const {id} = req.params;

    userdb.get(id)
    .then(user => {
        res.status(200)
        .json(user);
    })
    .catch(error => {
        res.status(500)
        .json({message: "The user info could not be retrieved."})
    })

})

server.listen(7000, ()=>console.log('\nServer is listening on port 7000\n'));