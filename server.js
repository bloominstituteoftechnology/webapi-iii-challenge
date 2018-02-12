const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

const users = [];
let UserId = 0;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

app.get('/users', (req, res) => {
  const user = req.body.user;
  if (UserId === 0) {
    res.status = STATUS_USER_ERROR;
    res.json({ error: "No User To Display" });
    return;
  }
  res.status = STATUS_SUCCESS;
  res.json({ users });
  return;
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "Must Prove a User Name" });
    return;
  }
  users.push(name);
  res.status = STATUS_SUCCESS;
  res.send(UserId + "");
  UserId++;
  return;
});

app.listen(PORT, err => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});
