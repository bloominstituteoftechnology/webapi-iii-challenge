const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const PORT = 3030;

const users = [
  { id: "1", user: "userOne" },
  { id: "2", user: "userTwo" },
  { id: "3", user: "userThree" },
];

server.listen(3030, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`)
  }
});

server.get("/users/:id", (req, res) => {
  const {
    id
  } = req.params;
  console.log(id);

  const user = users.filter(theUser => {
    return theUser.id === id
      console.log(theUser);
  });
  
  console.log(user);
  res.status(200);
  res.send(user);
});


server.get("/users", (req, res) => {
  res.status(200);
  res.send(users);
});