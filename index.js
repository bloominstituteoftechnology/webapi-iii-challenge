const express = require('express');
const userDB = require('./data/helpers/userDb.js');
const port = 7100;
const server = express();

const logger = (req, res, next) => {
  console.log(`${Date.now()} ${req.method} made to ${req.url}`);
  next();
};
server.use(logger, express.json());

const formatUserName = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}

server.get('/', (req, res) => {
  res.send('<h1><a href="https://github.com/michaelagard/Node-Blog" style="text-decoration:none; color:black"><code>Node-Blog Node.js Server</code></a></h1>');
}); // root server endpoint fluff

// get user
server.get('/api/users/:id', (req, res) => {
  userDB.get(req.params.id)
    .then(user => {
      console.log(user);
      if (!user) { return res.json({ message: `no user by that id` }) }
      res.json(user);
    })
    .catch(err => console.log(err));
}); // supply user ID, recieve user object

server.get('/api/users/posts/:id', (req, res) => {
  userDB.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err));
}); // supply user ID, recieve user posts

server.post('/api/users', formatUserName, (req, res) => {
  if (!req.body.name) { return res.json({ message: `need name` }) }
  if (req.body.name.length > 128) { return res.json({ message: `go shorter on name` }) }
  userDB.insert(req.body)
    .then(({ id }) => res.json({ message: `Good job, returned ID ${id}` }))
    .catch(err => console.log(err));
});

server.put('/api/users/:id', formatUserName, (req, res) => {
  if (!req.body.name) { return res.json({ message: `need name` }) }
  if (req.body.name.length > 128) { return res.json({ message: `go shorter on name` }) }
  userDB.update(req.params.id, req.body)
    .then(count => {
      if (!count) { return res.json({ message: `no user by that id` }) }
      res.json({ message: `Way to go, returned count ${count}` })
    })
    .catch(err => console.log(err));
});

server.delete('/api/users/:id', (req, res) => {
  userDB.remove(req.params.id)
    .then(removed => {
      if (!removed) { return res.json({ message: `no user by that id` }) }
      res.json({ message: `Way to go, removed count ${removed}` })
    })
    .catch(err => console.log(err));
})

server.listen(port, () => {
  console.log(`### Node-Blog server started on ${port} ###`);
});