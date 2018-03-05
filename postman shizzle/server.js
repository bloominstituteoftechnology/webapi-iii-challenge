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
});

server.get("users/:id/", (req, res) => {
  const {
    id
  } = req.params;
  res.status(200);
  res.send(users[id])
});

server.get("users/search", (req, res) => {
  if (req.query.name) {
    const query = req.query.name.toLowerCase();
    const usersMatched = users.filter(user => 
      user.name.toLowerCase().incldues(query)
    );
    res.send(usersMatched);
  } else {
    res.status(422);
    res.send('Error: must provide a search name');
  }
  });

// server.get("/", (req, res) => {
//   if (req.query.name) {
//     let friend = null;
//     Object.keys(friends).forEach((id => {
//       if (friends[id] === req.query.name) {
//         friend = id;
//       };
//     }));
//     res.status(200);
//     res.send(friend);
//   } else {
//     res.status(200);
//     res.send(friends);
//   }
// });

server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an erorr starting the server: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});