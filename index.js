//Modules require 
const express = require('express');
const userDb = require('./data/helpers/userDb');
const helmet = require('helmet');
const morgan = require('morgan')
const server = express();
const middleware = require('./middleware');
const postsRouter = require('./Router/posts_router');
const parser = express.json()

const PORT = 5050;

server.use( parser,
            helmet(),
            morgan('dev'),
            //middleware.nameUppercase
          );
server.use('/api/posts',postsRouter);


//endpoints
server.get('/api/users',(req,res) =>{
  userDb.get()
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
    userDb.get(id)
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
    userDb.insert(user)
    .then(userInfo =>{
      userDb.get(userInfo.id)
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
  userDb.remove(id)
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
    userDb.update(id, user)
    .then(count =>{
      if(count){
        userDb.get(id).then(user =>{
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