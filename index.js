const express = require('express');
const server = express();
const userDb = require('./data/helpers/userdb.js');
const port = 3005;
const cors = require('cors');

server.use(cors());// connect to react
server.use(express.json());//use json data
//get all users


//middleware for get request
const upperCase = (req,res,next) =>{
  console.log(req.body);

 req.body.name = req.body.name.toUpperCase();

  console.log(req.body.name);

  next();
}




//get all post for user
server.get('/api/users/:id/posts',(req,res)=>{
  userDb.getUserPosts(req.params.id)
  .then(user =>{
    console.log('Success', user);
    res.status(200).json(user)
  })
  .catch(err =>{
    res.send(err)
  } )
});

server.get('/api/users',(req,res)=>{
  userDb.get()
  .then(user =>{
    console.log('Success', user);
    res.status(200).json(user)
  })
  .catch(err =>{
    res.send(err)
  } )
});


server.post('/api/users',upperCase,(req,res)=>{

  const{name} =req.body
  const newUser = {name}
  console.log(newUser);
  res.send('success');
  userDb.insert(newUser)
  .then(user=>{
  console.log("success", user);
  })
  .catch(err=>{
    console.log(err);
    res.send(err);
  })
})

server.put('/api/users/:id',(req,res)=>{
  const {name} = req.body;
  const editUser = {name};
  const {id} = req.params;
  res.send('Success');
  userDb.update(id,editUser)
  .then(users=>{
    console.log('Success',users );
  })
  .catch(err=>{
    res.send(err);
  })
})


server.listen(port,()=>{
  console.log(`\n=== Server listening on ${port} ===`)
})
