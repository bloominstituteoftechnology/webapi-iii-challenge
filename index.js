// import express
const express = require('express')

// import database
const postDb = require('./data/helpers/postDb')

// create server 
const server = express();

// import routers
const userRoutes = require('./users/userRoutes')

// middlewares
const combinedMiddleware = require('./config/middlewares')
combinedMiddleware(server)

const errorHandler = (err, req, res, next) => {
  res.sendStatus(err.httpStatusCode).json(err)
}

server.use(errorHandler)

// const asyncErrorHandler = fn => (req, res, next) => {
//   Promise.resolve(fn(req, res, next).catch(err => {
//     console.error(err)
//     next(err)
//   }))
// }

// routing
//  --> /users
server.use('/users', userRoutes)

//  --> /posts
server.get('/posts', async (req, res) => {
  const posts = await postDb.get()
  res.status(200).json(posts)
})

server.post('/posts', async (req, res) => {
  if (!req.body || !req.body.text || !req.body.userId) {
    res.status(500).json({ message: 'Error: missing JSON with text and userId properties' })
  } 

  const newPost = req.body
  const newId = await postDb.insert(newPost)
  const newPostWithId = { ...newPost, ...newId }
  res.status(200).json(newPostWithId)
})

server.put('/posts/:id', async (req, res) => {
  if (!req.body || !req.body.text || !req.body.userId) {
    res.status(500).json({ message: 'Error: missing JSON with text and userId properties' })
  } 

  const updateId = req.params.id
  const updatePost = req.body
  const count = await postDb.update(updateId, updatePost)

  if (count === 1) {
    res.status(200).json({ message: `Success: updated post with id ${req.params.id}` })
  } else {
    res.status(500).json({ message: `Error: cannot update post with id ${req.params.id}` })
  }
})

server.delete('/posts/:id', async (req, res) => {
  const deleteId = req.params.id
  const record = await postDb.remove(deleteId)
  if (record === 1) {
    res.status(200).json({ message: `Success: updated post with id ${req.params.id}` })
  } else {
    res.status(500).json({ message: `Error: cannot update post with id ${req.params.id}` })
  }
})

// run server
server.listen(8000, () => console.log('CORS-enabled web server listening on port 8k'))