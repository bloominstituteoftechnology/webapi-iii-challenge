const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const helmet=require('helmet');
const server=express();
const users = require('./data/helpers/userDb.js');
server.use(express.json()).use(cors()).use(morgan('dev')).use(helmet());

server.get('/users',(req,res)=>{
    users.get().then(user=>res.status(200).json(user)).catch(err=>res.status(500).json({error: "The users information could not be retrieved."}))}
    );
server.get('/users/:id',(req,res)=>{
    users.get(req.params.id).then(user=>res.status(200).json(user)).catch(err=>res.status(500).json({error:"The users information could not be retrieved"}))
})
server.post('/users',(req,res)=>{
    const user=req.body;
    if (!user) {
        res.status(400).json({errorMessage:"Please enter a user name"})
    } else {
        users.insert(user).then(user=>res.status(201).json(user))
        .catch(err=>res.status(500).json({ error: "There was an error while saving the user to the database" }))
    }
})
server.put('/users/:id',(req,res)=>{
    const user=req.body;
    if (!user) {
        res.status(400).json({errorMessage:"Please enter a user name"});
    } else {
        users.update(req.params.id,user).then(count=>{
            count===1?
            users.get(req.params.id).then(user=>res.status(200).json(user)).catch(err=>console.log(err)):
            req.status(404).json({message: "The post with the specified ID does not exist."})
        }
    ).catch(err=>res.status(500).json({ error: "The post information could not be modified." }))
    }
})
server.listen(9000,()=>console.log('Engines firing server starting new horizons venturing.'))