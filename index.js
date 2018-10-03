const express = require('express');

const userDb  = require('./data/helpers/userDb.js')
const postDb  = require('./data/helpers/postDb.js')
const tagDb  = require('./data/helpers/tagDb.js')

const server = express();


function upperCase(req, res, next){
  req.body.name = req.body.name.toUpperCase()
  console.log(req.body);
  next();
}

server.use(express.json())


// ******************
// ****User Methods**
// ******************
server.get('/users', (req, res, next) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })

})

server.get('/users/:id', (req, res, next) => {
  userDb.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.post('/users', upperCase, (req, res, next) => {
  const { name } = req.body;
  const newUser = { name };
  userDb.insert(newUser)
    .then(
      res.status(200).json(newUser)
    )
    .catch(err => {
      console.error(err);
    })
})

server.put('/users', upperCase, (req, res, next) => {
  const { name, id } = req.body;
  const updatedUser = { name };
  userDb.update(id, updatedUser)
    .then(
      res.status(200).json(updatedUser)
    )
    .catch(err => {
      console.error(err);
    })
})

server.delete('/users', (req, res, next) => {
  const { id } = req.body;
  userDb.remove(id)
    .then(
      res.status(200).json(`User with ID ${id} has been banished`)
    )
    .catch(err => {
      console.error(err);
    })
})


// ******************
// ****Post Methods**
// ******************

server.get('/posts', (req, res, next) => {
  postDb.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })

})

server.get('/posts/:id', (req, res, next) => {
  postDb.getPostTags(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

server.post('/posts', (req, res, next) => {
  const { text, postId } = req.body;
  const newPost = { text, postId };
  postDb.insert(newPost)
    .then(
      res.status(200).json(newPost)
    )
    .catch(err => {
      console.error(err);
    })
})


server.put('/posts', (req, res, next) => {
  const { text, postId } = req.body;
  const updatedPost = { text };
  postDb.update(postId, updatedPost)
    .then(
      res.status(200).json(updatedPost)
    )
    .catch(err => {
      console.error(err);
    })
})


server.delete('/posts', (req, res, next) => {
  const { id } = req.body;
  postDb.remove(id)
    .then(
      res.status(200).json(`Post #${id} has been banished`)
    )
    .catch(err => {
      console.error(err);
    })
})





// ****************** Init Port & Listen
const port = 9000

server.listen(port, () => console.log(`\n ** ** ** Listening on on port ${port} ** ** **  ` ))
