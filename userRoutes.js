const express = require('express');

const userDb = require('./data/helpers/userDb.js')

const router = express.Router

//CRUD operations for User /api/users

router.get('/', (request,response) => { 
    
    userDb
    .get() // get the data from (data)
    .then(user => {  //send the data in json
        res.json(users);
    }) //send the user to client
    .catch( error => {
        res.status(500).json({error: " Could not access server "} )
    })
})

router.get('/id', (req, res) => {
    const { id } = req.params;
    userDb
    .getUserPosts(id) //get users post by id
    .then( user => {
        res.json(user[0]);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

