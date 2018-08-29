const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const helmet=require('helmet');
const server=express();
const users = require('./data/helpers/userDb.js');
server.use(express.json()).use(cors()).use(morgan('dev')).use(helmet());

function upperCase(req, res, next) {
    req.body.name=req.body.name.toUpperCase();
    next();
  }

server.get('/users',(req,res)=>{
    users.get().then(user=>res.status(200).json(user)).catch(err=>res.status(500).json({error: "The users information could not be retrieved."}))}
    );
server.get('/users/:id',(req,res)=>{
    users.get(req.params.id).then(user=>res.status(200).json(user)).catch(err=>res.status(500).json({error:"The users information could not be retrieved"}))
})
server.post('/users',upperCase, (req,res)=>{
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
            req.status(404).json({message: "The user with the specified ID does not exist."})
        }
    ).catch(err=>res.status(500).json({ error: "The user information could not be modified." }))
    }
})
server.delete('/users/:id',(req,res)=>{
    users.remove(req.params.id).then(count=>count>0? res.status(200).json({success:`Deleted ${count} user(s)`}):res.status(404).json({ message: "The user with the specified ID does not exist." })
    ) .catch(err=>res.status(500).json({error: "The user could not be removed" }))
})

server.listen(9000,()=>console.log('Engines firing server starting new horizons venturing.'))