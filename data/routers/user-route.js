const express = require('express');
const Users = require('../../data/helpers/userDb.js');
const router = express.Router();

router.get('/', async (req, res) =>{
    try{
        const users = await Users.get(req.query);
        res.status(200).json(users);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving posts'
        })
    }
})

router.get('/:id', async (req, res) =>{
    try{
        const user = await Users.getById(req.params.id);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message: 'User not found'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving user',
        });
    }
});

router.post('/', async (req, res) =>{
    try{
        const user = await Users.insert(req.body);
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({
            message: "Error adding user",
        })
    }
})

router.delete('/"id', async(req, res) =>{
    try{
        const count = await Users.remove(req.params.id);
        if (count > 0){
            res.status(200).json({message: `Done Deleted`})
        }else{
            res.status(404).json({message: `Couldn't find the thing`})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: `Error removing the user`
        })
    }
})

router.put('/:id', async(req, res) =>{
    try{
        const user = await Users.update(req.params.id, req.body);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message: `post couldn't be found`})
        }
    }catch(error){
         console.log(error);
         res.status(500).json({
             message: `Error updating post`
         })   
    }
})