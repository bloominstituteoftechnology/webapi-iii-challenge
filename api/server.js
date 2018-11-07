const express = require('express')
const server = express();
const helmet = require('helmet')
const morgan = require('morgan')
const userDb = require('../data/helpers/userDb.js')
const postDb= require('../data/helpers/postDb.js')
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))

server.get('/posts', (req, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json(posts)
    })
   .catch(error => {
     res.status(500).json({message: 'there was a problem getting posts'})
   })
})

server.get('/users', (req, res) => {
   userDb.get()
    .then(users => {
      res.status(200).json(users)
    })
   .catch(error => {
     res.status(500).json({message: 'there was a problem getting users'})
   })
})

server.post('/posts', (req, res) => {
  const postData = req.body;
  if(postData.text.length === 0) {
    res.status(500).json({message: 'no empty strings'})
  } else {
    postDb.insert(postData).then(newPost => {
      postDb.get(newPost.id).then(post => {
        res.status(201).json(post);
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
        res.status(200).json({message: `${count} post deleted`})
      } else {
        res.status(404).json({message: `post not found`})
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
