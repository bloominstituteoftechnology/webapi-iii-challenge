//node modules
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const port = 5000;
const postDb = require('./data/helpers/postDb');
// const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');
const server = express();

//middlewares


//server code
server.use(express.json());
server.use(logger('tiny'), cors(), helmet());

//Route
server.get('/', (req, res) => {
  res.json('Hi');
});

//Users
server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      console.log('\n** users **', users);
      res.json(users);
    })
    .catch(err => res.json({Error: 'Error getting users.'}));
})

server.post('/api/users', (req, res) => {
 //console.log(req.body); 
  const { name } = req.body;
  const newUser = { name }
  userDb.insert(newUser)
    .then(user => {
      console.log('\n--- New user added ---\n, user');
      res.status(201).json(user);
    })
    .catch(err => res.json({ Error: 'Error adding a new user.'}));
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const editUser = { name }
  userDb.update(id, editUser)
    .then(user => {
      console.log('\n--- User edited ---\n, user');
      res.status(200).json(user);
    })
    .catch(err => res.json({Error: 'Error editting user.'}));
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb.remove(id)
    .then(removedUser => {
      console.log('\n--- User removed ---\n, removedUser');
      res.status(200).json(removedUser);
    })
    .catch(err => res.json({Error: 'Error removing user.'}));
})

//Posts
server.get('/api/posts', (req, res) => {
  postDb.get()
    .then(posts => {
      console.log('\n** posts **', posts);
      res.json(posts);
    })
    .catch(err => res.json({Error: 'Error getting posts.'}));
})

server.post('/api/posts', (req, res) => {
//  console.log(req.body); 
  const { text, userId } = req.body;
  const newPost = { text, userId }
  postDb.insert(newPost)
    .then(post => {
      console.log('\n--- New post added ---\n, post');
      res.status(201).json(post);
    })
    .catch(err => res.json({ Error: 'Error adding a new post.'}));
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;
  const editPost = { text, userId }
  postDb.update(id, editPost)
    .then(post => {
      console.log('\n--- Post edited ---\n, post');
      res.status(200).json(post);
    })
    .catch(err => res.json({Error: 'Error editting post.'}));
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb.remove(id)
    .then(removedPost => {
      console.log('\n--- Post removed ---\n, removedPost');
      res.status(200).json(removedPost);
    })
    .catch(err => res.json({Error: 'Error removing post.'}));
})


//port
server.listen(port, () => {
  console.log(`\n--- Server running on port ${port} ---\n`)
})