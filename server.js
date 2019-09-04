const express = require('express');

const userDb = require('./users/userDb')

const postDb = require('./posts/postDb')


const server = express();

server.get('/', (req, res) => {
userDb.get()
.then(response   => {
  console.log('response',response)
  postDb.get()
  .then(results   => {
    console.log('results',results)
  })
  .catch(error => {
    res.status(500).json({ message: 'error getting posts'}) 
  })
  })
.catch(error => {
  res.status(500).json({ message: 'error getting users'}) 
})
  res.send(`<h2>Let's write some middleware!</h2>`)
});


server.get('/api/posts', (req, res) => {
  console.log('not by id req',req.body)
db.find()
.then(response => {
 res.status(200).json(response);
})
.catch(error => {
 res.status(500).json({ message: 'error getting list of titles'})
})
}); 
//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

module.exports = server;
