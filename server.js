const express = require("express");
const bodyParser = require("body-parser");
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const server = express();

const PORT = 3030;

const users = [
  { name: "dixie", id: 0 },
  { name: "steven", id: 1 },
  { name: "edmund", id: 2 },
  { name: "michael", id: 3 }
];
let id = 4;

server.get("/users", (req, res) => {
  res.status(STATUS_SUCCESS);
  res.send(users);
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  res.status(STATUS_SUCCESS);
  res.send(users[id]);
});

server.get("/search", (req, res) => {
  //   if (req.query.name) {
  //     let user = null;
  //     Object.keys(users).forEach(id => {
  //       if (users[id] === req.query.name) {
  //         user = id;
  //       }
  //     });
  //     res.status(STATUS_SUCCESS);
  //     res.send(user);
  //   } else {
  //     res.status(STATUS_SUCCESS);
  //     res.send(users);
  //   }

  const name = req.query.name;
  const filterUsers = users.filter(user => {
    user = user.name.toLowerCase();
    return user === name.toLowerCase();
  });
  res.send(filterUsers);
});

// server.post("/", (req, res) => {
//     const { user } = req.body;
//     res.status(STATUS_SUCCESS);
//     res.send();
// })

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error stating the server: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
