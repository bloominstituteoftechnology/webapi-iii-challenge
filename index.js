const express = require('express');
const server = express();
const userDb = require('./data/helpers/userdb.js');
const port = 3005;

server.get('/api/users',(req,res)=>{
  userDb.get()
  .then(users=>{
    console.log('success',users);
     res.status(200).json(users);
  })
  .catch(err =>res.send(err))
})



server.listen(port,()=>{
  console.log(`\n=== Server listening on ${port} ===`)
})
