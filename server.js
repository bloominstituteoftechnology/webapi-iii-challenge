const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');

const SERVER = express();
const PORT = 3020;

SERVER.use(cors(), helmet(), logger('dev'));
SERVER.use(express.json());

// ----------- SETUP USERS END POINTS ----------------

// set up a get for all users to be DRY
const getUsers = (id, req, res) => {

    if (id) {
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
      }
      else {
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
      }
}

// ~~~~~~~~~~~ GET REQUEST USERS ~~~~~~~~~~~~~~~~~~~~
SERVER.get('/users', (req,res) => {
  return getUsers(null, req,res);
})

// ~~~~~~~~~~~ GET REQUEST FOR USER (ID) ~~~~~~~~~~~~~~~~~~~~
SERVER.get('/users/:id', (req, res) => {
  const { id } = req.params;
  return getUsers(id, req, res);
})
// ~~~~~~~~~~~ GET REQUEST FOR USER POSTS ~~~~~~~~~~~~~~~~~~~~
SERVER.get('/users/:id/posts', (req, res) => {
  const { id } = req.params;
  userDB.getUserPosts(id)
        .then(posts => {
          if(posts.length === 0) {
            res.status(404).json({message: "This user has no posts or this User does not exist. Please try again"})
          }
          else {
            res.json({posts})
          }
        })
        .catch(err => {
          res.status(500).json({error: err})
        })
})
// ~~~~~~~~~~~ POST REQUEST FOR NEW USER ~~~~~~~~~~~~~~~~~~~~
SERVER.post('/users', (req, res, next) => {
  const { name } = req.body;
  userDB.insert({name})
        .then(userID => {
          res.json(userID)
        })
})

// ~~~~~~~~~~~ DELETE REQUEST FOR USER ~~~~~~~~~~~~~~~~~~~~
SERVER.delete('/users/:id', (req, res) => {
  const { id } = req.params
  userDB.remove(id)
        .then(deleted => {
          if(deleted) {
            res.json({message: "user successfully deleted"})
          }
        })
        .catch(err => {
          res.status(500).json({error: err})
        })
})

// ~~~~~~~~~~~ DELETE REQUEST FOR USER ~~~~~~~~~~~~~~~~~~~~
SERVER.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  userDB.update(id, {name})
        .then(count => {
          if (count) {
            res.json({message: "user successfully updated!"})
          }
          else {
            res.status(400).json({message: "User was not updated, Try again later."})
          }
        })
        .catch(err => {
          res.status(500).json({error: err})
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
          res.status(404).json({error: "This post does not exist"})
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

// ~~~~~~~~~~~ DELETE REQUEST FOR POST ~~~~~~~~~~~~~~~~~~~~
SERVER.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  postDB.remove(id)
        .then(deleted => {
          if(deleted) {
            res.json({message: 'Post successfully deleted.'})
          }
        })
        .catch(err => {
          res.status(500).json({error: err})
        })
})

// ~~~~~~~~~~~ UPDATE REQUEST FOR POST ~~~~~~~~~~~~~~~~~~~~
SERVER.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  postDB.update(id, {text})
        .then(count => {
          if (count) {
            res.json({message: "Post has been successfully updated."})
          }
          else {
            res.status(400).json({message: "Please refresh and try again."})
          }
        })
        .catch(err => {
          res.status(500).json({error: "Server not responding, please try again"})
        })
})
SERVER.listen(PORT, () => {
  console.log(`\n~~~~ Server running on PORT:${PORT} ~~~~\n`)
})
