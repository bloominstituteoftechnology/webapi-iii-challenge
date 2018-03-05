const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3030;
const STATUS_SUCCESS = 200;
const STATUS_ERROR = 413;

let idCounter = 5;
const pets = {
  1: 'Rigby',
  2: 'Tag',
  3: 'Schatzi',
  4: 'Riley',
  5: 'Rigby',
};

server.use(bodyParser.json());

server.get('/', (req, res) => {
  console.log(req.query);
  res.status(STATUS_SUCCESS);
  res.send(pets);
});

server.get('/search?', (req, res) => {
  console.log(req.query);
  if (req.query.name) {
    let matchingPets = [];
    Object.keys(pets).forEach(id => {
      if (pets[id] === req.query.name)
        matchingPets.push({ id: id, name: pets[id] });
    });
    res.send(matchingPets);
  }
});

server.get('/:id/', (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  res.status(STATUS_SUCCESS);
  res.send(pets[id]);
  // res.error(STATUS_ERROR);
});

server.post('/pets/', (req, res) => {
  const name = req.body;
  idCounter++;
  pets[idCounter] = name.name;
  res.send(pets);
})

server.listen(PORT, err => {
  if (err) {
    console.log('Error starting server');
  } else {
    console.log('Server listening on port: ', PORT);
  }
});
