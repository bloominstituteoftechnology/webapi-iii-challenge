const express = require('express');
const cors = require('cors');
const postHelper = require('../data/helpers/postDb')
const userHelper = require('../data/helpers/userDb')

const server = express();


server.use(cors())
server.use(express.json())


function uppercase(req,res,next){
    req.body.name = req.body.name.toUpperCase();
    next();
}

server.get('/posts')

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
server.post('/users',uppercase,(req,res)=>{
    if(req.body.name && req.body.name.length < 129){
        userHelper.insert(req.body)
            .then(response=>{
               
                userHelper.get(response.id)
                    .then(user=>{
                            res.status(201).json(user)
                        })
                    .catch(error => res.status(500).json({message:error}))

            })
            .catch(error=>{console.log("An error occurred creating user data ", error)});
    } else  {
        res.status(400).send({message:"Name is required and cannot exceed 128chars "})
    }
})
server.put('/users/:id',uppercase, async (req,res)=>{
    const { id } = req.params;

    if(req.body.name && req.body.name.length < 129){
        try {
            let response = await userHelper.update(id,req.body)
            if(response === 1)
            {
                let user = await userHelper.get(id)
                res.status(200).json(user)
            } else 
            {
                res.status(404).json({message:'user not found for update'})
            }
                
        } catch (error) {
            res.status(500).json({message:error})            
        }
    } else  {
        res.status(400).send({message:"Name is required and cannot exceed 128chars "})
    }    
})
server.get('/posts',async(req,res)=>{
    try {
        const response = await postHelper.get();    
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({message:"Unable to fetch posts, an error has occurred. ", error})
    }
})
server.get('/posts/:id',async(req,res)=>{
    const { id } = req.params;
    try {
        const response = await postHelper.get(Number(id))
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({message:"Unable to fetch posts by Id, an error has occurred. ", id, error})
    }
})
server.delete('/posts/:id', async(req,res)=>{
    const { id } = req.params;
    try {
        const response = await postHelper.remove(id)
        if(response > 0){
            res.status(200).json({message:"Success: data has been deleted for", id})
        } else {
            res.status(404).send({message:"No data found for deletion", id})
        }
    } catch (error) {
        res.status(500).send({message:"Unable to delete post by Id, an error has occurred. ", id, error})
    }
})
server.put('/posts/:id',async(req,res)=>{
    if(req.body.userId)
    {
        try {
            const userExists = await userHelper.get(req.body.userId)
            if(userExists.id > 0){
                try {
                    const response = await postHelper.update(req.params.id,req.body)

                    if(response === 1){
                        try {
                            let post = await postHelper.get(req.params.id);
                            res.status(200).json(post)
                        } catch (error) {
                            res.status(500).json({message:error})          
                        }
                    }   
                     else {
                         res.status(404).json({message:"no post was found for update.",id})
                     }
                } catch (error) {
                    res.status(500).send({message:error, id})
                }
            } else {
                res.status(500).send({message:"Unable to update post, userid must be a valid user. "})
            }
        } catch (error) {
            res.status(500).send({message:error})
        }
    } else {
        res.status(500).send({message:"Unable to update post, userid is required. "})
    }
})
server.post('/posts',async(req,res)=>{
    if(req.body.userId && req.body.text)
    {
        try {
            const userExists = await userHelper.get(req.body.userId)
            if(userExists.id > 0){
                try {
                    const response = await postHelper.insert(req.body)
                    const post = await postHelper.get(response.id)
                    res.status(200).json(post);
                } catch (error) {
                    res.status(500).send({message:"Unable to insert new post, an error has occurred. ", id, error})
                }
            } else {
                res.status(500).send({message:"Unable to insert new post, userid must be a valid user. "})
            }
        } catch (error) {
            res.status(500).send({message:"Unable to insert new post, An error was thrown getting the user. ",error})
        }
    } else {
        res.status(500).send({message:"Unable to insert new post, userid is required. "})
    }
})
module.exports = server;