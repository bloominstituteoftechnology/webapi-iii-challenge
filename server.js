const express = require('express');
const cors = require('cors');
const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');
const SERVER = express();
const PORT = 3020;

SERVER.use(cors());
SERVER.use(express.json());

// ----------- SETUP USERS END POINTS ----------------

// ~~~~~~~~~~~ GET REQUEST USERS ~~~~~~~~~~~~~~~~~~~~
SERVER.get('/users', (req,res) => {
  userDB.get()
        .then(users => {
          if (users) {
            res.json({users: users})
          }
          else {
            res.status(404).json({message: "Users does not exist. Please add a user to the Database first."})
          }
        })
        .catch(err => {
          res.status(500).json({error: "Cannot Get Users From Database at this time, Come back later"})
        })
})

// ~~~~~~~~~~~ GET REQUEST FOR USER (ID) ~~~~~~~~~~~~~~~~~~~~
SERVER.get('/users/:id', (req, res) => {
  const { id } = req.params;

  userDB.get(id)
        .then(user => {
          if (user) {
          res.json({user: user})
          }
          else {
            res.status(404).json({error: "The user you are looking for does not exist"})
          }
        })
        .catch(err => {
          res.status(500).json({message: "Please try again later, cannot connect to database"})
        })
})

// ~~~~~~~~~~~ POST REQUEST FOR NEW USER ~~~~~~~~~~~~~~~~~~~~
SERVER.post('/users', (req, res) => {
  const { name } = req.body;
  userDB.insert({name})
        .then(userID => {
          res.json(userID)
        })
})

// ----------- SETUP POSTS END POINTS ----------------

// ~~~~~~~~~~~ GET REQUEST POSTS ~~~~~~~~~~~~~~~~~~~~
SERVER.get('/posts', (req, res) => {
  postDB.get()
        .then(posts => {
          if(posts) {
            res.json({posts: posts})
          }
          else {
            res.status(404).json({error: "Cannot access posts at this time, try again later."})
          }
        })
        .catch(err => {
          res.status(500).json({error: "Database down, come back later"})
        })
})

// ~~~~~~~~~~~ GET REQUEST FOR POST (ID) ~~~~~~~~~~~~~~~~~~~~
SERVER.get('/posts/:id', (req,res) => {
  const { id } = req.params;

  postDB.get(id)
        .then(post => {
          if(post) {
            res.json({post: post})
          }
          else {
            res.status(500).json({error: "The database is down, come back later"})
          }
        })
        .catch(err => {
          res.status(404).json({error: "Please try again, this post does not exist"})
        })
})

// ~~~~~~~~~~~ POST REQUEST FOR NEW POST ~~~~~~~~~~~~~~~~~~~~
SERVER.post('/posts', (req, res) => {
  const { userId, text } = req.body;
  const newPost = {text, userId };

  postDB.insert(newPost)
        .then(postID => {
          if(postID) {
            res.status(201).json({post: {...newPost}})
          }
          else {
            res.status(500).json({error: "Could not create new post, try again later"})
          }
        })
        .catch(err => {
          res.status(404).json({error: err})
        })
})

SERVER.listen(PORT, () => {
  console.log(`\n~~~~ Server running on PORT:${PORT} ~~~~\n`)
})
