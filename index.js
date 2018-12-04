//Modules require 
const express = require('express');
const db = require('./data/helpers/userDb');
const server = express();

const PORT = 5050;

//endpoints
server.get('/api/users',(req,res) =>{
  db.get()
  .then(users =>{
    res.json(users)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:"Unable to retrieve users "})
  })
})

server.get('/api/users/:id', (req, res)=>{
  const { id } = req.params;
  db.get(id)
  .then(user =>{
    console.log('user?',user);
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:"The User cannot be retrieved"})
  })
})




//listen
server.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})