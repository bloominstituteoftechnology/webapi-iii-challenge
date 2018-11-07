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
                res.status(404).send({errorMessage:"Unable to find the user by id ", id})
            }
        })
        .catch(error=>{console.log("An error occurred fetching user data by id ", error)});
})
server.delete('/users/:id',(req,res)=>{
    const { id } = req.params;
    userHelper.remove(id)
        .then(response =>{
            if(response > 0){
                res.status(200).json({message:"Success: data has been deleted for", id})
            } else {
                res.status(404).send({message:"No data found for deletion", id})
            }
        })
        .catch(error=>{console.log("An error occurred deleting user data ", error)});
})
server.post('/users',(req,res)=>{
    if(req.body.name && req.body.name.length < 129){
        userHelper.insert(req.body)
            .then(response=>{
                res.status(201).json(response)
            })
            .catch(error=>{console.log("An error occurred creating user data ", error)});
    } else  {
        res.status(400).send({message:"Name is required and cannot exceed 128chars "})
    }
})
server.put('/users/:id',(req,res)=>{
    const { id } = req.params;

    if(req.body.name && req.body.name.length < 129){
        userHelper.update(id,req.body)
        .then(response=>{
            res.status(200).json(response)
        })
        .catch(error=>{console.log("An error occurred updating user data ", error)});
    } else  {
        res.status(400).send({message:"Name is required and cannot exceed 128chars "})
    }    
})


module.exports = server;