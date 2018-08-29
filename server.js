const express = require('express');
const cors = require('cors');
const users = require('./data/helpers/userDb');
const posts = require('./data/helpers/postDb');


const server = express();
server.use(express.json());
server.use(cors({}));

//custon middleware
const capitalizeUsername = (req, res, next) => {
  if(!req.body.name) {
    res.status(422).json({ error: "A name is required" })
  }else{
    req.body.name = req.body.name.toLowerCase().split(' ').map(n => n.charAt(0).toUpperCase() + n.substring(1)).join(' ');
    console.log(req.body.name);
    next();
  }
}

// USER end points
server.get('/api/users', (req, res) => {
  users.get()
        .then(users => res.status(201).json(users))
        .catch(err => res.status(500).json({ error: "User information retrieval failed." }));
});

server.get('/api/users/:id', (req, res) => {
  users.get(req.params.id)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: "User information retrieval failed." }));
});

server.get('/api/users/:id/posts', (req, res) => {
  users.getUserPosts(req.params.id)
        .then(usrPosts => res.status(201).json(usrPosts))
        .catch(err => res.status(500).json({ error: "User's Post information retrieval failed." }));
});

server.post('/api/users', capitalizeUsername, (req, res) => {
  const { name } = req.body;
  users.insert({ name })
        .then(id => res.status(201).json(id))
        .catch(err => res.status(500).json({ error: "Database Failure on Inserting New User" }));
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users.remove(id)
        .then(deleted => deleted === 1 ?
                          res.status(201).json({ message: `User with id ${id} deleted.`}) :
                          res.status(500).json({ error: "Invalid User ID" })
                        )
        .catch(err => res.status(500).json({ error: `Database Failure on Deleting User with id ${id}` }));

});

server.put('/api/users/:id', capitalizeUsername, (req, res) => {
  const { id } =  req.params;
  const { name } = req.body;
  users.update(id, { name })
        .then(deleted => deleted === 1 ?
                          res.status(201).json({ message: `User with id ${id} updated.`}) :
                          res.status(500).json({ error: "Invalid User ID" }))
        .catch(err => res.status(500).json({ error: `Database Failure on Updating User with id ${id}` }));
});

//posts endpoints
server.get('/api/posts', (req, res) => {
  posts.get()
});

server.get('/api/posts/:id', (req, res) => {

});

server.post('/api/posts', (req, res) => {

});

server.delete('/api/posts/:id', (req, res) => {

});

server.put('/api/posts/:id', (req, res) => {

});

server.listen(9000, ()=> console.log('SERVER - PORT: 9000 - LISTENING'));
