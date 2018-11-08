const cors = require('cors');
const express = require('express');
const usersRouter = require ('../users/usersRouter');
const postRouter = require ('../posts/postRouter')

 module.exports = server => {
  server.use(cors());   
  server.use(express.json());
  
  server.use('/api/users', usersRouter)
  server.use('/api/posts', postRouter)
}