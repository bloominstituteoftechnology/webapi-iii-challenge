//node modules
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const port = 5000;
// const portDb = require('./data/helpers/postDb');
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

server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      console.log('\n** users **', users);
      res.json(users);
    })
    .catch(err => res.json({Error: 'Error getting users.'}));
})

server.post('/api/users', (req, res) => {
  console.log(req.body);
})


//port
server.listen(port, () => {
  console.log(`\n--- Server running on port ${port} ---\n`)
})