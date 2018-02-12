const express = require('express');
const bodyParser = require('body-parser');

const server = express();     // create the server using express
const PORT = 3060;            // specify the port as a constant

server.use(bodyParser.json());   // tell the server to use bodyParser

const users = {};
let id = 0;

server.get('/users', (req, res) => {
  if (id === 0) {
    res.status = 422;
    res.json({ error: 'No users added, cannot display' });
    return;
  }

  res.status = 200;
  res.json({ users });
  return;
});

server.post('/users', (req, res) => {
  users[req.body.name] = id;
  res.send(id + '');
  id++;
})

server.listen(PORT, error => {
  if (error) console.log(`Error starting server on port ${PORT}`);  // server start fail error msg
  else console.log(`Server listening on port ${PORT}`);             // server start success message
});