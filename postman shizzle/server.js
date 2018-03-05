const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3104;

let idCounter = 10;

const users = {
  1: "Michael",
  2: "Terrie",
  3: "Ivan",
  4: "Patrick",
  5: "Leon",
  6: "Eileen",
  7: "Daniel",
  8: "Ivan",
  9: "Punit",
  10: "Michael"
};

// server.use((req, res, next) => {
//   console.log("Got a request");
//   next();
// });

server.use(bodyParser.json());

server.post("/users", (req, res) => {
  const {
    user
  } = req.body;

  idCounter++;
  users[idCounter] = user;
  res.status(200);
  res.send({ id: idCounter });
});

server.get("/users", (req, res) => {
  res.status(200);
  res.send(users);
  console.log('MESSAGE: Grab all users');
});

server.delete("/users/:id", (req, res) => {
  const {
    id
  } = req.body;
  if (users[id]) {
    delete users[id];
  }
  res.status(200);
  res.send(users[id])
  console.log('MESSAGE: Deleted the user: ', req.params.id);
})

server.get("/search", (req, res) => {
  if (req.query.name) {
    let usersMatch = [];
    let user = null;
    Object.keys(users).forEach((id) => {
      if (req.query.name.toLowerCase() === users[id].toLowerCase()) {
        usersMatch.push(id);
        console.log('MESSAGE: Found the user');
      }
    });
    res.status(200);
    res.send(usersMatch);
    console.log('MESSAGE: Here is an array of the user IDs who match this name')
  } else {
    res.status(422);
    res.send('Error: must provide a search name');
  }
});


server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an erorr starting the server: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
