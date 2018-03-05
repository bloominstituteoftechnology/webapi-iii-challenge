const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3030;

let idCounter = 6;
const users = {
    1: 'Shobana',
    2: 'Tiffany',
    3: 'Ivan',
    4: 'shobana',
    5: 'tiffany',
    6: 'tiffany',
};

//middleware receives the request.
server.use(bodyParser.json());

server.get("/", (req, res) => {
    res.status(200);
    res.send(users);
});

server.get('/search?', (req,res) => {
  if (req.query.name){
    let user = [];
    Object.keys(users).forEach((id => {
        if(users[id].toLowerCase() === req.query.name.toLowerCase() ) {
          user.push(users[id]);
        };
    }));

    res.status(200);
    res.send(user);
  } else {
    res.status(200);
    res.send(users);
  }
});

// get req with id
server.get("/:id/", (req, res) => {
const id = req.params.id;
console.log(users[id]);
 res.status(200);
 res.send(users[id]);
});


//post req with users
server.post("/users/", (req, res) => {
  const name = req.body.name;
  console.log(name);
  idCounter++;
  users[idCounter] = name.name;
  res.send(users);
});

server.delete("/users/:id", (req, res) => {
  const id = req.params;
  delete users[id];
  console.log("delete");
  res.send(users);
});




server.listen(PORT, err => {
    if(err) {
        console.log("There was an error");
    } else {
        console.log(`Server is listening on PORT number ${PORT}`);
    }
});

