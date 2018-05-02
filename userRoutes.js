const express = require('express');

const userDb = require('./data/helpers/userDb.js');

const router = express.Router();

//CRUD operations for User /api/users

router.get('/', (req,res) => { 
    
    userDb
    .get() // get the data from (data)
    .then(users => {  //send the data in json
        res.json(users);
    }) //send the user to client
    .catch( error => {
        res.status(500).json({error: " Could not access server "} )
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    userDb
    .getUserPosts(id) //get users post by id
    .then( user => {
        res.json(user);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.post('/', (req,res) => {
    const user = req.body;

    userDb
    .insert(user)
    .then ( response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({error: "Error while saving to db"})
    });
    
})

router.put('/:id', (req, res) => {

    userDb
    .update(id, update)
    .then( response => {

    })
    .catch()
})

router.delete('/:id', (req, res) => {

    userDb
    .remove(id)
    .then()
    .catch()
})
module.exports = router;