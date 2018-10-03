const express = require('express');
const userDB = require('./data/helpers/userDb.js');
const port = 7100;
const server = express();

const logger = (req, res, next) => {
  console.log(`${Date.now()} ${req.method} made to ${req.url}`);
  next();
};
server.use(logger);

// const formatUserName = (req, res, next) => {
//   req.name = req.params.name.toUpperCase();
//   next();
// }

server.get('/', (req, res) => {
  res.send('<h1><a href="https://github.com/michaelagard/Node-Blog" style="text-decoration:none; color:black"><code>Node-Blog Node.js Server</code></a></h1>');
}); // root server endpoint fluff

server.get('/api/user/:id', (req, res) => {
  userDB.get(req.params.id)
    .then(posts => {
      res.json(posts);
    })
}) // supply user ID, recieve user object

server.get('/api/user/posts/:id', (req, res) => {
  userDB.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts);
    })
}) // supply user ID, recieve user posts

server.put('/api/user/addpost', (req, res) => {
  userDB.insert(post)
    .then(posts => {
      res.json(posts);
    })
})

server.listen(port, () => {
  console.log(`### Node-Blog server started on ${port} ###`);
});