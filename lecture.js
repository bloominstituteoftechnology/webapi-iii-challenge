const express = require('express');
const server = express();

const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');
const users = require('./data/helpers/userDb');

function atGate(req, res, next) {
    console.log(`At the gate, about to be eaten`);
  
    next();
}

function auth(req, res, next) {
  if (req.url === '/mellon') {
    next();
  } else {
    res.send('You shall not pass!');
  }
}

server.use(atGate)
server.use(express.json());

server.get('/mellon', auth, (req, res) => {
  console.log('Gate opening...');
  console.log('Inside and safe');
  res.send('Welcome Traveler!');
});

server.get('/api/users', auth, (req, res) => {
    users.get()
        .then(response => {
            res.json(response)
        })
        .catch(() => {
            res.status(500).json({ error: "The users information could not be retrieved."})
        })
});


server.listen(5000, () => console.log('API running on port 5000'));