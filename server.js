const express = require('express');
const dbUser = require('./data/helpers/userDb');
const dbPost = require('./data/helpers/postDb');
const dbTags = require('./data/helpers/tagDb');

const server = express();

server.use(express.json()); // built-in middleware

server.get('/', (req, res) => res.send('your server is working'));

/**************** USERS ****************/
// retrieve all users 
server.get('/users', (req, res) => { 
  dbUser.get()
  .then(users => res.json(users))
    .catch(err => req.status(500).json({ error: "The users could not be retrieved." }))
})

// get users by id
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  dbUser.get(id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: "That user could not be retrieved." }))
})

/**************** POSTS ****************/
// get user posts 
server.get('/users/:id/posts', (req, res) => {
  const { id } = req.params;
  dbUser.getUserPosts(id)
    .then(userPosts => res.json(userPosts)) // returns array of objects with props of id, text, postedBy
    .catch(err => res.status(500).json({ error: "Could not retrieve those posts." }))
})

// retrieve all posts
server.get('/posts', (req, res) => {
  dbPost.get()
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json({ error: "The posts could not be retrieved." }))
})

// gets posts via id
server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  dbPost.get(id)
    .then(post => res.json(post)) // returns object with props text, postedBy, tags (array)
    .catch(err => res.status(500).json({ error: "We're having trouble retrieving that post." }))
})

// get post tags
server.get('/posts/:id/tags', (req, res) => {
  const { id } = req.params;
  dbPost.getPostTags(id)
    .then(tags => res.json(tags)) // returns array of objects with prop "tag" ... one tag per object
    .catch(err => res.status(500).json({ error: "We could not find any tags." }))
})

/**************** TAGS ****************/
// retrieve all tags
server.get('/tags', (req, res) => {
  dbTags.get()
    .then(tags => res.json(tags))
    .catch(err => res.status(500).json({ error: "The tags could not be retrieved." }))
})

// get tags by id
server.get('/tags/:id', (req, res) => {
  const { id } = req.params;
  dbTags.get(id)
    .then(tags => res.json(tags)) // returns object with props id, tag
    .catch(err => res.status(500).json({ error: "Sorry." }))
})

server.listen(5000);