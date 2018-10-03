const express = require('express');

const userDb  = require('./data/helpers/userDb.js')
const postDb  = require('./data/helpers/postDb.js')
const tagDb  = require('./data/helpers/tagDb.js')

const server = express();


function upperCase(req, res, next){
  console.log('Upper:', req.body);
  console.log('working globally');
  next();
}

server.use(express.json())
server.use(upperCase)

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

server.post('/users', (req, res, next) => {
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

server.put('/users', (req, res, next) => {
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



  // get
  // post
  // put
  // delete

const port = 9000

server.listen(port, () => console.log(`\n ** ** ** Listening on on port ${port} ** ** **  ` ))
