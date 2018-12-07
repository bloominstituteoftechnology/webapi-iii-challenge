//Modules require 
const express = require('express');
const db = require('./data/helpers/userDb');
const helmet = require('helmet');
const morgan = require('morgan')
const server = express();
const middleware = require('./middleware');
const parser = express.json()

const PORT = 5050;

server.use( parser,
            helmet(),
            morgan('dev'),
            middleware.nameUppercase
          );


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
      if(user){
        res.json(user)
      }else{
        res
        .status(404)
        .json({message:"The user with the specified ID does not exist."})
      }
    })
    .catch(err =>{
      res
      .status(500)
      .json({message:"The user information cannot be retrieved"});
    })
})

// server.use(middleware.nameUppercase)

server.post('/api/users',(req, res) =>{
  const user = req.body 
  if(user.name){
    db.insert(user)
    .then(userInfo =>{
      db.get(userInfo.id)
        .then(user =>{
        res.status(201).json(user)
      })
    })
    .catch(err =>{
      res
      .status(500)
      .json({message:"There was an error while saving the user to the database"})
    })
  }
  else{
  res
  .status(400)
  .json({message:"User Name is missing  "})
  } 
})

server.delete('/api/users/:id', (req, res)=>{
  const { id } = req.params
  db.remove(id)
  .then( count =>{
    if(count){
      res.json({message:"The user has been successfully deleted"})
    }
    else{
      res
      .status(404)
      .json({message:"The user with that specific ID does not exist "})
    }
  })
  .catch(err =>{
    res.status(500).json({message:" The user could not be removed"})
  })
})


server.put('/api/users/:id',(req,res) =>{
  const { id } = req.params
  const user = req.body
  if(user.name){
    db.update(id, user)
    .then(count =>{
      if(count){
        db.get(id).then(user =>{
          res.json(user)
        })
      }
      else{
        res
        .status(404)
        .json({message:"The user with the specified ID does not exist. "})
      }
    })
    .catch(err =>{
      res
      .status(500)
      .json({message:"The post information could not be modified."})
    })
  }
  else{
  res
  .status(400)
  .json({message:"User Name is missing  "})
  }
  
})

//listen
server.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})