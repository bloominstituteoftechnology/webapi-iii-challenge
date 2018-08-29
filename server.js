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

server.listen(9000,()=>console.log('Engines firing server starting new horizons venturing.'))