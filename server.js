const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

let users = [{user: "John", id:0}, {user: "Kate", id:1}, {user: "Toby", id:2}, {user: "Grace", id:3}];
let id = 4;

app.get('/users', (req, res) => {
  res.status(200).send(users);
});

app.get('/users/:id', (req, res) => {
    res.status(200).send(users[req.params.id])
});

app.get("/search", (req, res) => {
    const name = req.query.name;
    const filter = users.filter(user => {
        user = user.name.toLowerCase();
        return user.toLowerCase();
    });
    res.send(filter);
});

app.post('/users', (req, res) => {
  const user = req.body.user;
  users = [...users, { name: user, id: id}];
  id++;
  res.send(users);
});

app.listen(PORT, err => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});
