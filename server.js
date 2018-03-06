const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());
const PORT = 3030;

const users = ["Joe", "John", "Jerry"];

server.get('/users', (req, res) => {
  res.status(200);
  res.send(users);
});

server.get('/users/:id', (req, res) => {
  let id = req.params.id;
  if(id) {
    res.status(200);
    res.send(users[id--]);
  }
});

server.get('/search', (req, res) => {
  let results = [];
  let name = req.query.name;
  if (name) {
    for (let i = 0; i < users.length; i++){
      if(name.toUpperCase() === users[i].toUpperCase()){
        results.push(users[i]);
      }
    }
    res.status(200);
    res.send(results);
  }
});

server.post('/users', (req, res) => {
  const user = req.body.user;
  if (user) {
    users.push(user);
    res.status(200);
    res.send(users);
  }
});

server.delete('/users/:id', (req, res) => {
  let id = req.params.id;
  if(id) {
    users.splice(id, 1);
    res.status(200);
    res.send(users);
  }
})

server.listen(PORT, err => {
  if (err) {
    console.log(`ERROR! ${err}`);
  } else {
    console.log(`SERVER ${PORT}`);
  }
});