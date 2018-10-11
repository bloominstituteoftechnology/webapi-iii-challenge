const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

const postHelper = require('./data/helpers/postDB')
const tagHelper = require('./data/helpers/tagDB')
const userHelper = require('./data/helpers/userDB')


const server = express();

server.use(express.json());
server.use(cors());
server.use(logger('combined'));
server.use(helmet());




server.get('/', (req, res) => {
    res.send('Good Morning :). I\'m glad this is working!')
});



server.get('/posts', (req, res) => {
    postHelper.get()
    .then (posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: 'The posts information could not be retrieved.' }));
});


server.get('/users', (req, res) => {
    userHelper.get()
    .then (users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: 'The users information could not be retrieved.' }));
});


server.get('/users/:id', (req, res) => {
    userHelper.get(req.params.id)
      .then(user => {
        if (!user) {return res.status(400).json({ message: 'User with provided id does not exist.' });}
        return res.status(200).json(user);
      })
      .catch(err => res.status(500).json({ message: 'User\'s information could not be retrieved.'}));
});


server.get('/user-posts/:id', (req, res) => {
    userHelper.getUserPosts(req.params.id)
      .then(user => {
        if (!user) {return res.status(400).json({ message: 'User with provided id does not exist.' });}
        return res.status(200).json(user);
      })
      .catch(err => res.status(500).json({ message: 'User\'s posts could not be retrieved.'}));
});








const port = 8000;
server.listen(port, () => console.log(`\n=== API running on http://localhost:${port}`));