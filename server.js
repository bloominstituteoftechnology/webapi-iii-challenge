const express = require('express');
const bodyParser = require('body-parser');

const server = express();     // create the server using express
const PORT = 3060;            // specify the port as a constant

server.use(bodyParser.json());   // tell the server to use bodyParser

const users = {};
let id = 0;
const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

server.get('/users', (req, res) => {
  if (id === 0) {
    res.status = STATUS_USER_ERROR;
    res.json({ error: 'No users added, cannot display' });
    return;
  }

  res.status = STATUS_SUCCESS;
  res.json({ users });
  return;
});

server.get('/users/:id', (req, res) => {
  const findId = req.params.id;
  // let foundName = '';
  const foundName = Object.keys(users)[findId];
  console.log(Object.keys(users));
  if (!foundName) {
    res.status = STATUS_USER_ERROR;
    res.json({ error: `User with ID ${findId} not found`});
    return;
  }
  res.status = STATUS_SUCCESS;
  res.json({ foundName });
  return;
});

server.post('/users', (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status = STATUS_USER_ERROR;
    res.json({ error: 'Name must be specified' });
    return;
  }
  users[name] = id;
  res.status = STATUS_SUCCESS;
  res.send(id + '');
  id++;
  return;
})

server.listen(PORT, error => {
  if (error) console.log(`Error starting server on port ${PORT}`);  // server start fail error msg
  else console.log(`Server listening on port ${PORT}`);             // server start success message
});