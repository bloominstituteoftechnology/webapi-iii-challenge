const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const port = 3030;

let idCounter = 1;
let users = [
  {
    name: "",
    id: 0
  }
]

server.get("/", (req, res) => {
  res.status(200);
  res.send(users);
})

server.get('/:id', (req, res) => {
  const { id } = req.paramsl
  res.status(200);
  res.send(users[id]);
});

server.get("/", (req, res) => {
  if (req.query.name) {
    const user = users.find(target => target.name ===
      req.query.name)


  }
  res.status(200)
  res.send(user);

});

server.post("/", (req, res) => {
  const {
    user
  } = req.body;
  users[idCounter] = user;
  idCounter++;
  res.status(200);
  res.send(idCounter + "");

})

server.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id);
  user = users.splice(index, 1)[0];
  res.status(200);
  res.send(user);
})


server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`); 2
  } else {
    console.log(`Server is listening on ${PORT}`);
  }
});

