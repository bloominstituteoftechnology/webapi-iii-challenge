const express = require("express");
const bodyParser = require("body-parser");
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const server = express();

const PORT = 3030;

let id = 4;
const users = [
  { name: "dixie", id: 0 },
  { name: "steven", id: 1 },
  { name: "edmund", id: 2 },
 { name: "michael", id: 3 }
]

server.use((req, res, next) => {
    console.log("Got a request")
    next();
});

server.use(bodyParser.json());


server.get("/users", (req, res) => {
//<<<<<<< HEAD
    res.status(STATUS_SUCCESS);
    res.send(users);
})

//>>>>>>> 3d3dc5ba24dd1f4d754cae0a4c8683bd73c1d6d7

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

  //Addition

  const name = req.query.name;
  const filterUsers = users.filter(user => {
    user = user.name.toLowerCase();
    return user === name.toLowerCase();
  });
  res.send(filterUsers);
});

 server.post("/users", (req, res) => {
     const { user } = req.body;
        let users = [...users, {name: user, id: id}];
        id++;
     res.status(STATUS_SUCCESS);
     res.send(users);
 });

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error stating the server: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});