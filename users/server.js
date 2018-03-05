const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

let idCounter = 3;
const users = {
  1: "Ivan",
  2: "Sean",
  3: "Josh"
};

app.use((req, res, next) => {
  console.log('Got a request');
  next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  if (req.query.name) {
    let user = null;
    Object.keys(users).forEach((id => {
      if (users[id] === req.query.name) {
        user = id;
      };
    }));
    res.status(200);
    res.send(user);
  } else {
    res.status(200);
    res.send(users);
  }
  res.status(200);
  res.send(users);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200);
  res.send(users[id]);
});

app.post('/', (req, res) => {
  const { user } = req.body;
  idCounter++;
  users[idCounter] = user;
  res.status(200);
  res.send({ id: idCounter });
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  // const foundId = users.find(user => user.id == id);
  //
  // if (foundId) {
  //   const removed = { ...foundId };
  //   users = users.filter(user => user.id !== id);
  //   res.status(200);
  //   res.send(removed);
  // }
  if (users.hasOwnProperty(id)) {
    delete users[id];
    res.status(200);
    res.send(users);
  }
})

app.listen(PORT, (error) => {
  if (error) {
    console.log(`There was an error starting the server: ${error}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
