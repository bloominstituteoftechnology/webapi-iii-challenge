const express = require('express');
const server = express();
const userdb = require("./data/helpers/userDb.js")
const postdb = require("./data/helpers/postDb.js")
const tagdb = require("./data/helpers/tagDb.js")
const cors = require("cors");




//middleware
server.use(express.json())

// function logger(req, res, next) {
//   console.log(`${req.method} to ${req.url}`);
//
//   next(); //calls the next middleware in the queue
// }


// for all
function userToUpperCase(req, res, next) {
  req.monkey = true
  next();
}
//for a particular user
function capatlize( req, res, next){
  req.body.name = req.body.name.toUpperCase();
  next();
}


//ask eric why you need req.monkey and note just a declared bolean value?

/*
reusable bit of captalization:
if(req.monkey) {users = users.map(each =>
    each.name.toUpperCase())
*/

//routes
server.get('/', (req, res) => {
  res.send('Hello')
})
// --Get all Users and capatlize
server.get('/users', userToUpperCase, (req, res) => {

    const id = req.params.id;
    userdb.get(id)
    .then(users => {
      if(users){
        if(req.monkey) {users = users.map(each =>
            each.name.toUpperCase())
            res.status(200).json(users)
          }
            else{
              res.status(404).json({error: "could not get users"})
            }
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: 'Cannot Get Users'})
    })
})
//posts
server.get('/posts', (req, res) => {

    const id = req.params.id;
    postdb.get(id)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: 'Cannot Get Posts'})
    })
})
//posts by post id, cannot seem to do it by userId this way.
server.get('/posts/:id', (req, res) => {

    const id = req.params.id;
    postdb.get(id)
    .then(posts => {
      if(posts){
        res.status(200).json(posts)
      }
      else{
        res.status(404).json({error: "do it right moron"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: 'Cannot Get Posts'})
    })
})
// --Get User By id
server.get('/users/:id',  (req, res) => {

    const id = req.params.id;

    userdb.get(id)
    .then(users => {
      if(users){

        res.status(200).json(users)
      }
      else{
        res.status(404).json({error: "do it right moron"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: 'Cannot Get Users'})
    })
})
//--Get post for a given user:
server.get('/users/posts/:id', (req,res) => {

  const id = req.params.id;

  userdb.getUserPosts(id)
    .then(user => {
      if(user.length === 0){
        res.status(400).json({message: 'This id could not be found'})
      }
      else{
        res.status(200).json(user)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({error: "failed to get user"})
    })
})
//--Add user through Post
server.post('/users/:id', capatlize, (req, res) => {

  const username = req.body.name;
  if(!username){
    res.status(400).json({message: "Please provide a name for this user"})
  }
  userdb.insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "Failed to add user"})
  })
})
//getting sql  constraint for duplicate names how to  handle this exception?
// How to add with specified route id?

//Delete User
server.delete('/users/:id', (req, res) => {

  const id = req.params.id;
  userdb.remove(id)
  .then(user => {
    if(user === 0) {
      res.status(400).json({ message: "please use a valid id"})
    }
    else{
      res.status(200).json(user)
    }
    })
    .catch(err =>{
      console.log(err)
      res.status(500).json({ error: "can't delete user" })
  })
})
//Update User
server.put('/users/:id', capatlize, (req, res) =>{

  const id = req.params.id;
  const name = req.body.name;
  const body = req.body

  if(!name){
    res.status(400).json({error: "Please christen this poor virtual soul"})
  }

  userdb.update(id, body)
  .then(user => {
    if(user === 0){
      res.status(400).json({message: 'This Id does not exist'})
    }
    else{
      res.status(200).json(user)
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "Failed to update user, please discipline database accordingly"})
  })
})
//Listener
server.listen(8000, ( ) => console.log('\n == API on port 8000 =='))
