const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3030;

server.listen(PORT, err => {
  if (err) console.log(`Error is ${err}`);
  else console.log(`Listening on port: ${PORT}`);
});

idCounter = 3;
const users = {
  1: 'Bob',
  2: 'Bob2',
  3: 'Bob3',
};

server.post('/', (req, res) => {
  const user = req.body;

  idCounter++;
  users[idCounter] = user;
  res.status(200);
  res.send({ id: idCounter });
});
