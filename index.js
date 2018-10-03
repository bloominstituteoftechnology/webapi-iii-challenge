
const express = require('express'); // CommonJS modules > module.exports = someCode;
const userdb = require('./data/helpers/userDb');
const postdb = require('./data/helpers/postDb.js');
const cors = require('cors');

const server = express(); // creates the server

server.use(cors()); // this neeeded to connect from react

server.use(express.json()); // formatting our req.body obj.



server.get('/', (req, res) => {
  res.send('Is this working?')
})

// #################### GET #######################

// ******************** GET All USERS **********************
server.get('/users', (req, res) => {
  userdb.get()
  .then(users => {
    res.status(200).json(users)
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: 'Internal Server Error when getting users'})
  });
})

// ******************** GET All POSTS **********************
server.get('/posts', (req, res) => {
  postdb.get()
  .then(posts => {
    res.status(200).json(posts)
  }).catch(err => {
    console.log(err)
    res.status(500).json({message: 'Internal Server Error when getting posts'})
  });
})



// watch for traffic in a particular computer port
const port = 9000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);