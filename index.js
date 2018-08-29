const express = require('express');
const helmet = require('helmet'); 
const cors = require('cors'); 
const morgan = require('morgan'); 
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const tagsDb = require('./data/helpers/tagDb'); 

const server = express(); 

server.use(express.json()); 
server.use(helmet()); 
server.use(morgan('dev')); 
server.use(cors({})); 
/////Middleware 
const nameCheckMiddleware = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      errorHelper(404, 'Name must be included', res);
      next();
    } else {
      next();
    }
  };
/////EndPoints 
server.get('/', (req, res)=>{
    res.send("Hello World")
})
server.get('/users', (req, res) =>{
    userDb.get()
    .then(users =>{
        res.status(200).json(users); 
    })
    .catch(err =>{
        console.log('error', err);
        res.status(500).json({message: "Error Getting Data"})
    })
})
server.get('/users', nameCheckMiddleware, (req, res)=>{
    const { name } = req.body; 
    userDb
    .insert({name})
    .then(posts =>{
        res.status(200).json(posts); 
    })
    .catch(err=>{
        console.log("error", err);
        res.status(500).json({message: "Error Getting MiddleWare"})
    })
})
server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userDb
      .get(id)
      .then(user => {
        if (user === 0) {
          return errorHelper(404, 'No user by that Id in the DataBase', res);
        }
        res.json(user);
      })
      .catch(err => {
        return errorHelper(500, "Database", res);
      });
  });

  server.get('/users/posts/:userId', (req, res)=>{
        const {userId} = req.params; 
        userDb
        .getUserPosts(userId)
  })


server.listen(3001, () => console.log('server 3001 started'))