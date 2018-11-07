const express = require('express')
const server = express();
const helmet = require('helmet')
const morgan = require('morgan')
const userDb = require('../data/helpers/userDb.js')
const postDb= require('../data/helpers/postDb.js')
let theDatabase;
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))

upperCase = (req, res, next) => {
  req.body = {...req.body, name: req.body.name.toUpperCase()} 
    next()
}

server.get('/users/:id/posts', (req, res) => {
  userDb.getUserPosts(req.params.id).then(posts => {
    res.status(200).json(posts)
  })
   .catch(error => {
     res.status(500).json({message: 'there was a problem getting posts'})
   })
})

server.get('/posts', (req, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json(posts)
    })
   .catch(error => {
     res.status(500).json({message: `there was a problem getting posts`})
   })
})


server.get('/users', (req, res) => {
  userDb.get()
    .then(posts => {
      res.status(200).json(posts)
    })
   .catch(error => {
     res.status(500).json({message: `there was a problem getting posts`})
   })
})

server.post('/users', upperCase, (req, res) => {
  const userData = req.body;
  if(userData.name.length === 0) {
    res.status(500).json({message: 'no empty strings'})
  } else {
    userDb.insert(userData).then(newUser => {
      userDb.get(newUser.id).then(user => {
        res.status(201).json(user);
      })
    })
     .catch(error => {
       res.status(500).json({message: 'there was a problem creating post'})
   })
  }


})

server.delete('/posts/:id', (req, res) => {
    postDb.remove(req.params.id).then(count => {
      if(count){
        res.status(200).json({message: `${count} ${req.params.thing} deleted`})
      } else {
        res.status(404).json({message: `${req.params.thing} not found`})
      }
    })
     .catch(error => {
       res.status(500).json({message: 'there was a problem deleting post'})
   })
})

server.put('/posts/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  postDb.update(id, changes).then(count => {
      res.status(200).json({message: `${count} post updated`})
  })
})


module.exports = server
