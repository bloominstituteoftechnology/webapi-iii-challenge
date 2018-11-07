const express = require('express');
const cors = require('cors');
const postHelper = require('../data/helpers/postDb')
const userHelper = require('../data/helpers/userDb')

const server = express();


server.use(cors())
server.use(express.json())


server.get('/users',(req,res)=>{
    userHelper.get()
        .then(response => res.status(200).json(response))
        .catch(error=>{console.log("An error occurred fetching user data ", error)});
})
server.get('/users/:id',(req,res)=>{
    const { id } = req.params;
    userHelper.get(id)
        .then(response => {
            
            if(response){ 
                res.status(200).json(response)
            } else {
                res.status(404).json({errorMessage:"Unable to find the user by id ", id})
            }
        })
        .catch(error=>{console.log("An error occurred fetching user data ", error)});
})


module.exports = server;