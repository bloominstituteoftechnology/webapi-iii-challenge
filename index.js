const express = require('express');
const server = express();
const userDb = require('./data/helpers/userdb.js');
const port = 3005;

server.get('/api/users',(req,res)=>{
  usserbDb.get()
  .then(users=>{
    console.log(success,posts);
  })
})



server.listen(port,()=>{
  console.log(`\n=== Server listening on ${port} ===`)
})
